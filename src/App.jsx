import { useState } from "react";
import FormularioDeDatos from "./FormularioDeDatos";
import ZeroWasteGuides from "./ZeroWasteGuides";
import AsignacionVehiculos from "./AsignacionVehiculos";
import ConfiguracionRutas from "./ConfiguracionRutas";
import GeneracionReportes from "./GeneracionReportes";

export default function App() {
  const [activeTab, setActiveTab] = useState("formulario");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-8">
      {/* Barra de navegación */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => setActiveTab("formulario")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "formulario"
              ? "bg-blue-600 text-white"
              : "bg-white shadow hover:bg-blue-100"
          }`}
        >
          Formulario
        </button>
        <button
          onClick={() => setActiveTab("guias")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "guias"
              ? "bg-green-600 text-white"
              : "bg-white shadow hover:bg-green-100"
          }`}
        >
          Guías
        </button>
        <button
          onClick={() => setActiveTab("vehiculos")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "vehiculos"
              ? "bg-yellow-600 text-white"
              : "bg-white shadow hover:bg-yellow-100"
          }`}
        >
          Vehículos
        </button>
        <button
          onClick={() => setActiveTab("rutas")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "rutas"
              ? "bg-purple-600 text-white"
              : "bg-white shadow hover:bg-purple-100"
          }`}
        >
          Rutas
        </button>
        <button
          onClick={() => setActiveTab("reportes")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === "reportes"
              ? "bg-red-600 text-white"
              : "bg-white shadow hover:bg-red-100"
          }`}
        >
          Reportes
        </button>
      </div>

      {/* Contenido dinámico */}
      <div className="max-w-4xl mx-auto">
        {activeTab === "formulario" && (
          <div className="flex justify-center items-center">
            <FormularioDeDatos />
          </div>
        )}
        {activeTab === "guias" && (
          <div>
            <ZeroWasteGuides />
          </div>
        )}
        {activeTab === "vehiculos" && (
          <div className="flex justify-center items-center">
            <AsignacionVehiculos />
          </div>
        )}
        {activeTab === "rutas" && (
          <div className="flex justify-center items-center">
            <ConfiguracionRutas />
          </div>
        )}
        {activeTab === "reportes" && (
          <div className="flex justify-center items-center">
            <GeneracionReportes />
          </div>
        )}
      </div>
    </div>
  );
}
