import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import FormularioDeDatos from './FormularioDeDatos.jsx';
// import App from './Guias.jsx'   // 👈 lo dejas comentado por ahora

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormularioDeDatos />   {/* 👈 aquí renderizas tu formulario */}
  </StrictMode>,
);
