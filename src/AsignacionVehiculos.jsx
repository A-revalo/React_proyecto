import { useState } from "react";

export default function AsignacionVehiculos() {
  const [vehiculos] = useState([
    { id: 1, placa: "ABC123", tipo: "Camión", capacidad: "5 Ton" },
    { id: 2, placa: "XYZ987", tipo: "Furgoneta", capacidad: "2 Ton" },
    { id: 3, placa: "JKL456", tipo: "Motocarro", capacidad: "500 Kg" },
  ]);

  const [conductores] = useState([
    "Carlos Pérez",
    "María Gómez",
    "Luis Rodríguez",
  ]);

  const [asignaciones, setAsignaciones] = useState({});

  const handleAsignar = (vehiculoId, conductor) => {
    setAsignaciones({ ...asignaciones, [vehiculoId]: conductor });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">🚚 Asignación de Vehículos</h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Placa</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Capacidad</th>
              <th className="px-4 py-2 text-left">Conductor</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehiculo) => (
              <tr key={vehiculo.id} className="border-t">
                <td className="px-4 py-2">{vehiculo.placa}</td>
                <td className="px-4 py-2">{vehiculo.tipo}</td>
                <td className="px-4 py-2">{vehiculo.capacidad}</td>
                <td className="px-4 py-2">
                  <select
                    value={asignaciones[vehiculo.id] || ""}
                    onChange={(e) => handleAsignar(vehiculo.id, e.target.value)}
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">-- Seleccionar --</option>
                    {conductores.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
