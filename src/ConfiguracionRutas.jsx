import { useEffect, useState } from "react";
import axios from "axios";

export default function ConfigurarRutas() {
  const [rutas, setRutas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({
    nombre_ruta: "",
    punto_inicio: "",
    punto_fin: "",
    distancia: "",
    frecuencia: "",
    id_Vehiculo: ""
  });

  // Cargar rutas y vehículos
  useEffect(() => {
    fetchData();
    axios.get("http://localhost:3001/vehiculos").then(res => setVehiculos(res.data));
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3001/rutas").then(res => setRutas(res.data));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.nombre_ruta || !form.punto_inicio || !form.punto_fin) {
      alert("Faltan campos obligatorios");
      return;
    }
    await axios.post("http://localhost:3001/rutas", form);
    fetchData();
    setForm({ nombre_ruta: "", punto_inicio: "", punto_fin: "", distancia: "", frecuencia: "", id_Vehiculo: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta ruta?")) {
      await axios.delete(`http://localhost:3001/rutas/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Configuración de Rutas</h2>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-2">Crear nueva ruta</h3>
        <input
          name="nombre_ruta"
          value={form.nombre_ruta}
          onChange={handleChange}
          placeholder="Nombre de la ruta"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          name="punto_inicio"
          value={form.punto_inicio}
          onChange={handleChange}
          placeholder="Punto de inicio"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          name="punto_fin"
          value={form.punto_fin}
          onChange={handleChange}
          placeholder="Punto final"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          name="distancia"
          value={form.distancia}
          onChange={handleChange}
          placeholder="Distancia (km)"
          className="w-full border p-2 rounded mb-2"
        />
        <input
          name="frecuencia"
          value={form.frecuencia}
          onChange={handleChange}
          placeholder="Frecuencia (ej: Diario, Semanal)"
          className="w-full border p-2 rounded mb-2"
        />

        <select
          name="id_Vehiculo"
          value={form.id_Vehiculo}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="">-- Asignar vehículo (opcional) --</option>
          {vehiculos.map(v => (
            <option key={v.id_Vehiculo} value={v.id_Vehiculo}>
              {v.placa} - {v.modelo}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar Ruta
        </button>
      </div>

      {/* Lista de rutas */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Listado de rutas</h3>
        {rutas.length === 0 ? (
          <p>No hay rutas registradas.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Nombre</th>
                <th className="p-2 border">Inicio</th>
                <th className="p-2 border">Fin</th>
                <th className="p-2 border">Vehículo</th>
                <th className="p-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rutas.map(r => (
                <tr key={r.id_Ruta} className="text-center">
                  <td className="border p-2">{r.nombre_ruta}</td>
                  <td className="border p-2">{r.punto_inicio}</td>
                  <td className="border p-2">{r.punto_fin}</td>
                  <td className="border p-2">{r.vehiculo || "Sin asignar"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(r.id_Ruta)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
