import { useState } from "react";

export default function ConfiguracionRutas() {
  const [rutas, setRutas] = useState([
    {
      id: 1,
      nombre: "Ruta Norte",
      inicio: "Barrio A",
      fin: "Estación Reciclaje 1",
      distancia: "12 km",
      frecuencia: "Diaria",
      vehiculo: "Camión 1"
    },
    {
      id: 2,
      nombre: "Ruta Sur",
      inicio: "Barrio B",
      fin: "Estación Reciclaje 2",
      distancia: "18 km",
      frecuencia: "Semanal",
      vehiculo: "Camión 2"
    },
    {
      id: 3,
      nombre: "Ruta Centro",
      inicio: "Plaza Central",
      fin: "Planta Compostaje",
      distancia: "8 km",
      frecuencia: "Diaria",
      vehiculo: "Motocarro 1"
    }
  ]);

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
           Configuración de Rutas
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Aquí puedes visualizar y administrar las especificaciones de cada ruta de recolección
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-md">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Inicio</th>
                <th className="px-4 py-3 text-left">Fin</th>
                <th className="px-4 py-3 text-left">Distancia</th>
                <th className="px-4 py-3 text-left">Frecuencia</th>
                <th className="px-4 py-3 text-left">Vehículo</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rutas.map((ruta, index) => (
                <tr key={ruta.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-4 py-3 font-medium">{ruta.nombre}</td>
                  <td className="px-4 py-3">{ruta.inicio}</td>
                  <td className="px-4 py-3">{ruta.fin}</td>
                  <td className="px-4 py-3">{ruta.distancia}</td>
                  <td className="px-4 py-3">{ruta.frecuencia}</td>
                  <td className="px-4 py-3">{ruta.vehiculo}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 mr-2">
                      Editar
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
