import React, { useState, useEffect } from "react";

function AsignacionVehiculoForm() {
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [administradores, setAdministradores] = useState([]);

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [rutaSeleccionada, setRutaSeleccionada] = useState("");
  const [adminSeleccionado, setAdminSeleccionado] = useState("");

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await fetch("http://localhost:3001/vehiculos");
        const data = await res.json();
        setVehiculos(data);
      } catch (error) {
        console.error("Error cargando vehículos:", error);
      }
    };

    const fetchRutas = async () => {
      try {
        const res = await fetch("http://localhost:3001/rutas");
        const data = await res.json();
        setRutas(data);
      } catch (error) {
        console.error("Error cargando rutas:", error);
      }
    };

    const fetchAdmins = async () => {
      try {
        const res = await fetch("http://localhost:3001/administradores");
        const data = await res.json();
        setAdministradores(data);
      } catch (error) {
        console.error("Error cargando administradores:", error);
      }
    };

    fetchVehiculos();
    fetchRutas();
    fetchAdmins();
  }, []);

  // Manejar selección de vehículo
  const handleVehiculoChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const vehiculo = vehiculos.find((v) => v.id_Vehiculo === id);
    setVehiculoSeleccionado(vehiculo);
  };

  // Guardar asignación
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehiculoSeleccionado || !rutaSeleccionada) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/rutas/asignar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_Vehiculo: vehiculoSeleccionado.id_Vehiculo,
          id_Ruta: rutaSeleccionada,
        }),
      });

      const data = await res.json();
      alert(data.message || "Asignación guardada correctamente");
    } catch (error) {
      console.error("Error guardando asignación:", error);
      alert("❌ Error al guardar la asignación");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Asignación de Vehículo</h2>

      {/* Select Vehículo */}
      <label>
        Seleccionar vehículo:
        <select
          value={vehiculoSeleccionado?.id_Vehiculo || ""}
          onChange={handleVehiculoChange}
        >
          <option value="" disabled>
            -- Seleccione --
          </option>
          {vehiculos.map((vehiculo) => (
            <option key={vehiculo.id_Vehiculo} value={vehiculo.id_Vehiculo}>
              {vehiculo.placa} - {vehiculo.modelo}
            </option>
          ))}
        </select>
      </label>

      {/* Info del vehículo */}
      {vehiculoSeleccionado && (
        <div style={{ marginTop: "10px" }}>
          <p>
            <strong>Placa:</strong> {vehiculoSeleccionado.placa}
          </p>
          <p>
            <strong>Modelo:</strong> {vehiculoSeleccionado.modelo}
          </p>
          <p>
            <strong>Capacidad:</strong> {vehiculoSeleccionado.capacidad} kg
          </p>
        </div>
      )}

      {/* Select Ruta */}
      <label>
        Seleccionar ruta:
        <select
          value={rutaSeleccionada}
          onChange={(e) => setRutaSeleccionada(e.target.value)}
        >
          <option value="" disabled>
            -- Seleccione --
          </option>
          {rutas.map((ruta) => (
            <option key={ruta.id_Ruta} value={ruta.id_Ruta}>
              {ruta.zona}
            </option>
          ))}
        </select>
      </label>

      {/* Select Administrador (opcional, informativo) */}
      <label>
        Seleccionar administrador:
        <select
          value={adminSeleccionado}
          onChange={(e) => setAdminSeleccionado(e.target.value)}
        >
          <option value="" disabled>
            -- Seleccione --
          </option>
          {administradores.map((admin) => (
            <option key={admin.id_Admin} value={admin.id_Admin}>
              {admin.nombre} {admin.apellido}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" style={{ marginTop: "15px" }}>
        Guardar asignación
      </button>
    </form>
  );
}

export default AsignacionVehiculoForm;
