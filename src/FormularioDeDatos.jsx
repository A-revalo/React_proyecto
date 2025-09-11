import { useState } from "react";

function FormularioDeDatos() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    edad: "",
    genero: "",
    aceptarTerminos: false,
  });

  const [errores, setErrores] = useState({});
  const [mostrarModal, setMostrarModal] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!formData.nombre) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      nuevosErrores.email = "Correo inválido";
    if (formData.telefono.length < 7)
      nuevosErrores.telefono = "Teléfono demasiado corto";
    if (!formData.aceptarTerminos)
      nuevosErrores.aceptarTerminos = "Debes aceptar los términos";
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
    } else {
      setErrores({});

      try {
        const res = await fetch("http://localhost:3001/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log("✅ Usuario guardado:", data);
        alert("Usuario guardado con éxito");
        setMostrarModal(false);
      } catch (error) {
        console.error("❌ Error al guardar:", error);
        alert("Error al guardar el usuario");
      }
    }
  };

  return (
    <>
      {mostrarModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setMostrarModal(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-md max-w-lg w-full
              transform transition duration-300 ease-in-out scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center mb-4">
              Formulario de Datos
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre */}
              <div>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
                {errores.nombre && (
                  <p className="text-red-500 text-sm">{errores.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
                {errores.email && (
                  <p className="text-red-500 text-sm">{errores.email}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
                {errores.telefono && (
                  <p className="text-red-500 text-sm">{errores.telefono}</p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Edad */}
              <div>
                <input
                  type="number"
                  name="edad"
                  placeholder="Edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Género */}
              <div>
                <select
                  name="genero"
                  value={formData.genero}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">Seleccione género</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Aceptar términos */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aceptarTerminos"
                  checked={formData.aceptarTerminos}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label>Acepto los términos y condiciones</label>
              </div>
              {errores.aceptarTerminos && (
                <p className="text-red-500 text-sm">
                  {errores.aceptarTerminos}
                </p>
              )}

              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Enviar
              </button>
              
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default FormularioDeDatos;
