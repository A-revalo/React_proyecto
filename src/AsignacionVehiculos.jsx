import { useEffect, useState } from "react";
import axios from "axios";

export default function AsignarVehiculoRuta() {
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [idVehiculo, setIdVehiculo] = useState("");
  const [idRuta, setIdRuta] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/vehiculos")
      .then((res) => setVehiculos(res.data));
    axios.get("http://localhost:3001/rutas").then((res) => setRutas(res.data));
  }, []);

  // ✅ Nuevo handleAsignar con manejo de errores
  const handleAsignar = async () => {
    if (!idVehiculo || !idRuta) {
      alert("Selecciona un vehículo y una ruta");
      return;
    }

    try {
      await axios.post("http://localhost:3001/rutas/asignar", {
        id_Vehiculo: idVehiculo,
        id_Ruta: idRuta,
      });
      alert("🚛 Vehículo asignado correctamente en la base de datos");
    } catch (err) {
      console.error(err);
      alert("❌ Error al asignar el vehículo");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Asignar Vehículo a Ruta</h2>

      <label className="block mb-2">Vehículo</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={idVehiculo}
        onChange={(e) => setIdVehiculo(e.target.value)}
      >
        <option value="">-- Selecciona --</option>
        {vehiculos.map((v) => (
          <option key={v.id_Vehiculo} value={v.id_Vehiculo}>
            {v.placa} - {v.modelo}
          </option>
        ))}
      </select>

      <label className="block mb-2">Ruta</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={idRuta}
        onChange={(e) => setIdRuta(e.target.value)}
      >
        <option value="">-- Selecciona --</option>
        {rutas.map((r) => (
          <option key={r.id_Ruta} value={r.id_Ruta}>
            {r.nombre_ruta}
          </option>
        ))}
      </select>

      <button
        onClick={handleAsignar}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Asignar
      </button>
    </div>
  );
}
