import { useState, useEffect } from "react";

export default function PerfilUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`/api/usuarios/${userId}`);
        const data = await res.json();
        setUsuario(data);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuario();
  }, [userId]);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  // Guardar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    setMensaje("");
    try {
      const res = await fetch(`/api/usuarios/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      if (!res.ok) throw new Error("Error al actualizar");
      setMensaje("✅ Datos actualizados correctamente");
    } catch (error) {
      setMensaje("❌ Error al guardar los datos");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) return <p className="text-center">Cargando datos...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        👤 Mi Perfil Zero Waste
      </h2>

      {mensaje && (
        <div className="mb-4 text-center text-sm font-medium text-green-700">
          {mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Correo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={usuario.email || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            name="telefono"
            value={usuario.telefono || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dirección */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dirección
          </label>
          <input
            type="text"
            name="direccion"
            value={usuario.direccion || ""}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Botón */}
        <div className="text-center">
          <button
            type="submit"
            disabled={guardando}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
