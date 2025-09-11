import { useEffect, useState } from "react";

export default function ConfiguracionRutas() {
  const [rutas, setRutas] = useState([]);

  // Cargar rutas desde la base de datos
  useEffect(() => {
    fetch("http://localhost:3001/rutas")
      .then((res) => res.json())
      .then((data) => setRutas(data))
      .catch((err) => console.error("Error cargando rutas:", err));
  }, []);

  const handleEliminar = (id) => {
    fetch(`http://localhost:3001/rutas/${id}`, { method: "DELETE" })
      .then(() => setRutas(rutas.filter((r) => r.id !== id)))
      .catch((err) => console.error("Error eliminando ruta:", err));
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center"> Configuración de Rutas</h2>
      <table className="w-full border">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Inicio</th>
            <th className="p-2 text-left">Fin</th>
            <th className="p-2 text-left">Distancia</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.id} className="border-t">
              <td className="p-2">{ruta.nombre}</td>
              <td className="p-2">{ruta.punto_inicio}</td>
              <td className="p-2">{ruta.punto_fin}</td>
              <td className="p-2">{ruta.distancia} km</td>
              <td className="p-2">
                <button
                  onClick={() => handleEliminar(ruta.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
