import React, { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { collection, addDoc } from 'firebase/firestore';
import { db } from './config/db';
import './styles/RequestForm.css';  

const TIPO_RESIDUO_OPTIONS = [
  { value: "aprovechables", label: "Residuos aprovechables", sub: ["Papel", "Plástico", "Vidrio"] },
  { value: "ordinarios", label: "Residuos ordinarios", sub: ["Papel higiénico", "Sobres", "Servilletas usadas"] },
  { value: "peligrosos", label: "Residuos peligrosos", sub: ["Baterías", "Pinturas"] },
  { value: "construccion", label: "Residuos de construcción", sub: ["Escombros", "Madera"] }
];

const LOCALIDADES = [
  "Usaquén",
  "Chapinero",
  "Santa Fe",
  "San Cristóbal",
  "Usme",
  "Tunjuelito",
  "Bosa",
  "Kennedy",
  "Fontibón",
  "Engativá",
  "Suba",
  "Barrios Unidos",
  "Teusaquillo",
  "Mártires",
  "Antonio Nariño",
  "Puente Aranda",
  "La Candelaria",
  "Rafael Uribe Uribe",
  "Ciudad Bolívar"
];


export default function RequestForm() {
  const [telefono, setTelefono] = useState("");
  const [tipoRes, setTipoRes] = useState("");
  const [subtipo, setSubtipo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [unidad, setUnidad] = useState("kg");
  const [estado, setEstado] = useState("solido");
  const [imagenes, setImagenes] = useState([]);
  const [imagenPreviews, setImagenPreviews] = useState([]);
  const [fecha, setFecha] = useState(null);
  const [hora, setHora] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const onSelectTipo = (val) => {
    setTipoRes(val);
    setSubtipo("");
  };

  const onChangeImages = (e) => {
    const files = Array.from(e.target.files || []);
    setImagenes(files);

    // crear previews para mostrar en el formulario
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagenPreviews(previews);
  };

  const validate = () => {
    const err = {};
    if (!telefono || telefono.trim().length < 7) err.telefono = "Ingrese un teléfono de contacto válido";
    if (!tipoRes) err.tipoRes = "Seleccione tipo de residuo";
    if (!cantidad || Number(cantidad) <= 0) err.cantidad = "Ingrese cantidad válida";
    if (!fecha) err.fecha = "Seleccione fecha solicitada";
    if (!hora) err.hora = "Ingrese hora preferida";
    if (!localidad) err.localidad = "Seleccione localidad";
    if (!direccion || direccion.trim().length < 5) err.direccion = "Ingrese dirección exacta";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Envío a Firestore. NOTA: no sube imágenes a Storage en este ejemplo.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "requests"), {
        telefono,
        tipoRes,
        subtipo,
        cantidad: Number(cantidad),
        unidad,
        estado,
        fecha: fecha ? fecha.toISOString() : null,
        hora: `${hora} ${amPm}`,
        localidad,
        direccion,
        createdAt: new Date().toISOString()
        // Si quieres guardar nombres de archivos localmente:
        // imagenes: imagenes.map(f => f.name)
      });

      console.log("Solicitud guardada con id:", docRef.id);
      alert("Solicitud enviada con éxito");

      // reset del formulario
      setTelefono("");
      setTipoRes("");
      setSubtipo("");
      setCantidad("");
      setUnidad("kg");
      setEstado("solido");
      setImagenes([]);
      setImagenPreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFecha(null);
      setHora("");
      setAmPm("AM");
      setLocalidad("");
      setDireccion("");
      setErrors({});
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al enviar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Formulario de Solicitud de Residuos</h1>
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label className="label">1. Teléfono de contacto</label>
          <input
            name="telefono"
            type="tel"
            placeholder="Ingrese teléfono..."
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className={errors.telefono ? "invalid" : ""}
          />
          {errors.telefono && <small className="error">{errors.telefono}</small>}
        </div>

        <div className="form-row">
          <label className="label">2. Tipos de residuos</label>
          <select value={tipoRes} onChange={(e) => onSelectTipo(e.target.value)}>
            <option value="">-- Seleccione tipo de residuos --</option>
            {TIPO_RESIDUO_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {tipoRes && (
            <select value={subtipo} onChange={(e) => setSubtipo(e.target.value)}>
              <option value="">-- Seleccione subtipo --</option>
              {(TIPO_RESIDUO_OPTIONS.find((t) => t.value === tipoRes)?.sub || []).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
          {errors.tipoRes && <small className="error">{errors.tipoRes}</small>}
        </div>

        <div className="form-row">
          <label className="label">3. Cantidad estimada</label>
          <div className="inline-row">
            <input
              type="number"
              min="0"
              placeholder="Agrega cantidad..."
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
              <option value="kg">KG</option>
              <option value="m3">M3</option>
              <option value="unidad">Unidad</option>
              <option value="Kilo">KL</option>
            </select>
          </div>
          {errors.cantidad && <small className="error">{errors.cantidad}</small>}
        </div>

        <div className="form-row">
          <label className="label">4. Estado de los residuos</label>
          <div className="radio-row">
            <label><input type="radio" name="estado" checked={estado==="solido"} onChange={() => setEstado("solido")} /> Sólido</label>
            <label><input type="radio" name="estado" checked={estado==="liquido"} onChange={() => setEstado("liquido")} /> Líquido</label>
            <label><input type="radio" name="estado" checked={estado==="gaseoso"} onChange={() => setEstado("gaseoso")} /> Gaseoso</label>
          </div>
        </div>

        <div className="form-row">
          <label className="label">5. Agregar imagen(es) de los residuos (opcional)</label>
          <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onChangeImages} />
          <div className="thumbs">
            {imagenPreviews.map((src, i) => (
              <div className="thumb" key={i}>
                <img src={src} alt={`preview-${i}`} />
                <small>{imagenes[i]?.name || `imagen ${i+1}`}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="form-row">
          <label className="label">6. Fecha solicitada para la recolección</label>
          <DatePicker
            selected={fecha}
            onChange={(d) => setFecha(d)}
            minDate={new Date()}
            placeholderText="Selecciona fecha..."
            dateFormat="dd/MM/yyyy"
            className={errors.fecha ? "invalid" : ""}
          />
          {errors.fecha && <small className="error">{errors.fecha}</small>}
        </div>

        <div className="form-row">
          <label className="label">7. Horario preferido de recolección</label>
          <div className="inline-row">
            <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
            <select value={amPm} onChange={(e) => setAmPm(e.target.value)}>
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>
          {errors.hora && <small className="error">{errors.hora}</small>}
        </div>

        <div className="form-row">
          <label className="label">8. Localidad de punto de recolección</label>
          <select value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
            <option value="">-- Elija localidad --</option>
            {LOCALIDADES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.localidad && <small className="error">{errors.localidad}</small>}
        </div>

        <div className="form-row">
          <label className="label">9. Dirección exacta de recolección</label>
          <textarea
            placeholder="Calle, número, referencia..."
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          {errors.direccion && <small className="error">{errors.direccion}</small>}
        </div>

        <div className="form-actions">
          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Enviando..." : "Solicitud recolección"}
          </button>
        </div>
      </form>
    </div>
  );
}