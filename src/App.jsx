import { useState } from "react";
import FormularioDeDatos from "./FormularioDeDatos";
import ZeroWasteGuides from "./ZeroWasteGuides";
import AsignacionVehiculos from "./AsignacionVehiculos";

function App() {
  const [activeTab, setActiveTab] = useState("formulario"); // estado inicial

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      {/* Barra de navegación */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab("formulario")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "formulario"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-blue-100"
          }`}
        >
          Formulario
        </button>
        <button
          onClick={() => setActiveTab("guias")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "guias"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-green-100"
          }`}
        >
          Guías
        </button>
        <button
          onClick={() => setActiveTab("vehiculos")}
          className={`px-6 py-2 rounded-lg font-medium transition ${
            activeTab === "vehiculos"
              ? "bg-purple-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-purple-100"
          }`}
        >
          Asignación de Vehículos
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "formulario" && <FormularioDeDatos />}
        {activeTab === "guias" && <ZeroWasteGuides />}
        {activeTab === "vehiculos" && <AsignacionVehiculos />}
      </div>
    </div>
  );
}

export default App;
