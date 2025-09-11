import { useEffect, useState } from "react";

export default function AsignacionVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [asignaciones, setAsignaciones] = useState({});

  // Obtener vehículos y conductores desde el backend
  useEffect(() => {
    fetch("http://localhost:3001/vehiculos")
      .then((res) => res.json())
      .then((data) => setVehiculos(data))
      .catch((err) => console.error("Error cargando vehículos:", err));

    fetch("http://localhost:3001/conductores")
      .then((res) => res.json())
      .then((data) => setConductores(data))
      .catch((err) => console.error("Error cargando conductores:", err));
  }, []);

  const handleAsignar = (vehiculoId, conductorId) => {
    setAsignaciones({ ...asignaciones, [vehiculoId]: conductorId });

    // Opcional: enviar al backend
    fetch(`http://localhost:3001/vehiculos/${vehiculoId}/asignar`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conductorId }),
    })
      .then((res) => res.json())
      .then((data) => console.log("Asignación guardada:", data))
      .catch((err) => console.error("Error al asignar:", err));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">🚚 Asignación de Vehículos</h2>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-2 text-left">Placa</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Capacidad</th>
            <th className="p-2 text-left">Conductor</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((v) => (
            <tr key={v.id} className="border-t">
              <td className="p-2">{v.placa}</td>
              <td className="p-2">{v.tipo}</td>
              <td className="p-2">{v.capacidad}</td>
              <td className="p-2">
                <select
                  className="border rounded p-1"
                  value={asignaciones[v.id] || ""}
                  onChange={(e) => handleAsignar(v.id, e.target.value)}
                >
                  <option value="">-- Seleccionar --</option>
                  {conductores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
