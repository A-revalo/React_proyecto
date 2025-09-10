import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function ZeroWasteGuides() {
  const [guides] = useState([
    {
      id: 1,
      titulo: "Guía Básica de Separación de Residuos",
      categoria: "Básico",
      descripcion: "Aprende los fundamentos de la separación correcta de residuos domésticos",
      fecha: "2024-03-15",
      tipoResiduos: ["Orgánicos", "Reciclables", "No reciclables"],
      pdfUrl: "#",
      imagen: "🗂️",
      tamaño: "2.3 MB"
    },
    {
      id: 2,
      titulo: "Separación de Plásticos - Guía Avanzada",
      categoria: "Avanzado",
      descripcion: "Identifica y separa correctamente los diferentes tipos de plásticos",
      fecha: "2024-03-10",
      tipoResiduos: ["PET", "HDPE", "PVC", "LDPE", "PP", "PS"],
      pdfUrl: "#",
      imagen: "♻️",
      tamaño: "3.1 MB"
    },
    {
      id: 3,
      titulo: "Compostaje Doméstico",
      categoria: "Intermedio",
      descripcion: "Convierte tus residuos orgánicos en compost casero",
      fecha: "2024-03-08",
      tipoResiduos: ["Orgánicos", "Compostables"],
      pdfUrl: "#",
      imagen: "🌱",
      tamaño: "1.8 MB"
    },
    {
      id: 4,
      titulo: "Residuos Electrónicos",
      categoria: "Especializado",
      descripcion: "Manejo responsable de dispositivos electrónicos y baterías",
      fecha: "2024-03-05",
      tipoResiduos: ["Electrónicos", "Baterías", "Cables"],
      pdfUrl: "#",
      imagen: "📱",
      tamaño: "2.7 MB"
    },
    {
      id: 5,
      titulo: "Residuos Peligrosos del Hogar",
      categoria: "Especializado",
      descripcion: "Identificación y disposición segura de residuos tóxicos domésticos",
      fecha: "2024-03-01",
      tipoResiduos: ["Químicos", "Pinturas", "Medicamentos"],
      pdfUrl: "#",
      imagen: "⚠️",
      tamaño: "4.2 MB"
    },
    {
      id: 6,
      titulo: "Textiles y Ropa",
      categoria: "Intermedio",
      descripcion: "Opciones de reciclaje y reutilización para textiles",
      fecha: "2024-02-28",
      tipoResiduos: ["Textiles", "Ropa", "Zapatos"],
      pdfUrl: "#",
      imagen: "👕",
      tamaño: "1.5 MB"
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const guiasFiltradas = guides.filter(guia => {
    const coincideBusqueda =
      guia.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      guia.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      guia.tipoResiduos.some(tipo => tipo.toLowerCase().includes(busqueda.toLowerCase()));

    const coincideCategoria =
      filtroCategoria === "Todos" || guia.categoria === filtroCategoria;

    return coincideBusqueda && coincideCategoria;
  });

  const categorias = ["Todos", "Básico", "Intermedio", "Avanzado", "Especializado"];

  const getCategoryColor = (categoria) => {
    const colors = {
      "Básico": "bg-green-100 text-green-800",
      "Intermedio": "bg-yellow-100 text-yellow-800",
      "Avanzado": "bg-orange-100 text-orange-800",
      "Especializado": "bg-purple-100 text-purple-800"
    };
    return colors[categoria] || "bg-gray-100 text-gray-800";
  };

  const handleDownload = (guia) => {
    alert(`Descargando: ${guia.titulo}`);
  };

  const handlePreview = (guia) => {
    alert(`Vista previa: ${guia.titulo}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
             Guías Zero Waste
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Descarga nuestras guías especializadas para separar correctamente tus residuos 
            y contribuir a un mundo más sostenible
          </p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            
            {/* Barra de búsqueda */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar guías..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Filtro por categoría */}
            <div className="flex gap-2 flex-wrap justify-center md:justify-end">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  onClick={() => setFiltroCategoria(categoria)}
                  className={`px-4 sm:px-6 lg:px-8 py-2 rounded-full text-sm sm:text-base font-medium transition-colors ${
                    filtroCategoria === categoria
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 text-center md:text-left">
            Mostrando {guiasFiltradas.length} de {guides.length} guías
          </div>
        </div>

        {/* Tabla de Guías */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm sm:text-base">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-left font-semibold">Guía</th>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-left font-semibold">Categoría</th>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-left font-semibold">Tipos de Residuos</th>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-left font-semibold">Fecha</th>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-left font-semibold">Tamaño</th>
                  <th className="px-6 sm:px-12 py-3 sm:py-4 text-center font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {guiasFiltradas.map((guia, index) => (
                  <tr key={guia.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    
                    {/* Información de la guía */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="text-xl sm:text-2xl">{guia.imagen}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{guia.titulo}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 max-w-xs">{guia.descripcion}</p>
                        </div>
                      </div>
                    </td>

                    {/* Categoría */}
                    <td className="px-4 sm:px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(guia.categoria)}`}>
                        {guia.categoria}
                      </span>
                    </td>

                    {/* Tipos de residuos */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {guia.tipoResiduos.slice(0, 2).map((tipo, i) => (
                          <span key={i} className="inline-flex px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                            {tipo}
                          </span>
                        ))}
                        {guia.tipoResiduos.length > 2 && (
                          <span className="inline-flex px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                            +{guia.tipoResiduos.length - 2} más
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Fecha */}
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-600">
                      {new Date(guia.fecha).toLocaleDateString("es-ES")}
                    </td>

                    {/* Tamaño */}
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-600">
                      {guia.tamaño}
                    </td>

                    {/* Acciones */}
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handlePreview(guia)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs sm:text-sm transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          Ver
                        </button>
                        <button
                          onClick={() => handleDownload(guia)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mensaje cuando no hay resultados */}
          {guiasFiltradas.length === 0 && (
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-xl border border-white border-opacity-40 p-6 sm:p-8 text-center">
              <div className="text-5xl sm:text-6xl mb-4">🔍</div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No se encontraron guías</h3>
              <p className="text-sm sm:text-base text-gray-600">Intenta ajustar los filtros o términos de búsqueda</p>
            </div>
          )}

          {/* Footer informativo */}
          <div
            className="mt-6 sm:mt-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl border border-white border-opacity-40 p-4 sm:p-6"
            style={{
              background: "linear-gradient(135deg, rgba(173, 228, 197, 0.3) 0%, rgba(69, 160, 73, 0.3) 100%)"
            }}
          >
            <div className="text-center">
              <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3">💡 ¿Sabías que...?</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Una correcta separación de residuos puede reducir hasta un 70% los desechos que van a vertederos. 
                ¡Cada pequeña acción cuenta para crear un futuro más sostenible!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
