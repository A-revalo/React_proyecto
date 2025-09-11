import { useEffect, useState } from "react";
import { FaUsers, FaTruck, FaRoute, FaFileExport } from "react-icons/fa";

export default function GeneracionReportes() {
  // Función para exportar a Excel
  const exportToExcel = () => {
    const tableData = [
      ["Nombre", "Email", "Teléfono", "Localidad"],
      ...usuarios.map(u => [
        `${u.nombre} ${u.apellido}`,
        u.email,
        u.telefono,
        u.localidad
      ])
    ];
    
    const csvContent = "data:text/csv;charset=utf-8," + 
      tableData.map(e => e.join(",")).join("\\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_usuarios.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de usuarios
        const resUsuarios = await fetch("http://localhost:3001/ciudadanos");
        const dataUsuarios = await resUsuarios.json();
        setUsuarios(dataUsuarios);

        // Obtener datos de vehículos
        const resVehiculos = await fetch("http://localhost:3001/vehiculos");
        const dataVehiculos = await resVehiculos.json();
        setVehiculos(dataVehiculos);

        // Obtener datos de rutas
        const resRutas = await fetch("http://localhost:3001/rutas");
        const dataRutas = await resRutas.json();
        setRutas(dataRutas);

        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos");
        setLoading(false);
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center">Cargando datos...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Generación de Reportes</h2>
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          <FaFileExport /> Exportar a Excel
        </button>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Usuarios</p>
              <p className="text-3xl font-bold mt-1">{usuarios.length}</p>
            </div>
            <FaUsers className="text-4xl opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Vehículos</p>
              <p className="text-3xl font-bold mt-1">{vehiculos.length}</p>
            </div>
            <FaTruck className="text-4xl opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-md text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Rutas</p>
              <p className="text-3xl font-bold mt-1">{rutas.length}</p>
            </div>
            <FaRoute className="text-4xl opacity-80" />
          </div>
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaUsers /> Últimos Usuarios Registrados
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Localidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barrio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usuarios.map((usuario, index) => (
                <tr key={usuario.id || index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{usuario.nombre} {usuario.apellido}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.telefono}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.localidad}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{usuario.barrio}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablas de Vehículos y Rutas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Vehículos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaTruck /> Estado de Vehículos
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacidad</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehiculos.map((vehiculo, index) => (
                  <tr key={vehiculo.id_Vehiculo || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{vehiculo.placa}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{vehiculo.modelo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{vehiculo.capacidad}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rutas */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaRoute /> Rutas Activas
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zona</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehículo Asignado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rutas.map((ruta, index) => (
                  <tr key={ruta.id_Ruta || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ruta.zona}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {vehiculos.find(v => v.id_Vehiculo === ruta.id_Vehiculo)?.placa || ruta.id_Vehiculo}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
