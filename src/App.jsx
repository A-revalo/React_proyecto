import { useState } from "react";
import FormularioDeDatos from "./FormularioDeDatos";
import ZeroWasteGuides from "./ZeroWasteGuides";
import AsignacionVehiculos from "./AsignacionVehiculos";
import ConfiguracionRutas from "./ConfiguracionRutas";

function App() {
  const [activeTab, setActiveTab] = useState("formulario");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Barra de navegación */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveTab("formulario")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "formulario"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
          >
            Formulario
          </button>
          <button
            onClick={() => setActiveTab("guias")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "guias"
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            Guías
          </button>
          <button
            onClick={() => setActiveTab("vehiculos")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "vehiculos"
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            Asignación de Vehículos
          </button>
          <button
            onClick={() => setActiveTab("rutas")}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "rutas"
                ? "bg-orange-600 text-white"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            Configuración de Rutas
          </button>
        </div>

        {/* Contenido dinámico */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === "formulario" && <FormularioDeDatos />}
          {activeTab === "guias" && <ZeroWasteGuides />}
          {activeTab === "vehiculos" && <AsignacionVehiculos />}
          {activeTab === "rutas" && <ConfiguracionRutas />}
        </div>
      </div>
    </div>
  );
}

export default App;
