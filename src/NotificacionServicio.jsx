import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const NotificacionServicio = () => {
  const [permiso, setPermiso] = useState(false);
  const [socket, setSocket] = useState(null);
  const [servicios, setServicios] = useState([]);
  const userId = '123'; // En una aplicación real, esto vendría de tu sistema de autenticación

  useEffect(() => {
    // Conectar con Socket.IO
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    // Registrar usuario para notificaciones
    socketInstance.emit('registrarUsuario', userId);

    // Solicitar permiso para notificaciones
    const solicitarPermiso = async () => {
      try {
        const permission = await Notification.requestPermission();
        setPermiso(permission === 'granted');
      } catch (error) {
        console.error('Error al solicitar permiso:', error);
      }
    };

    solicitarPermiso();

    // Cargar servicios especiales existentes
    cargarServiciosEspeciales();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const enviarNotificacionCamion = (mensaje) => {
    if (!permiso) return;

    new Notification('Servicio de Recolección', {
      body: mensaje,
      icon: '/public/vite.svg', // Puedes cambiar esto por tu propio ícono
    });
  };

  const enviarNotificacionServicioEspecial = (detalles) => {
    if (!permiso) return;

    new Notification('Servicio Especial', {
      body: detalles,
      icon: '/public/vite.svg',
      badge: '/public/vite.svg',
      requireInteraction: true,
    });
  };

  const cargarServiciosEspeciales = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/servicios-especiales/usuario/${userId}`);
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
    }
  };

  const solicitarServicioEspecial = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/servicios-especiales/solicitud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          tipo: 'recolección',
          fecha: new Date().toISOString(),
          ubicacion: {
            lat: 0, // Aquí irían las coordenadas reales del usuario
            lng: 0,
          },
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Servicio solicitado:', data.servicioId);
      }
    } catch (error) {
      console.error('Error al solicitar servicio:', error);
    }
  };

  // Escuchar eventos de Socket.IO
  useEffect(() => {
    if (!socket) return;

    socket.on('actualizacionUbicacion', (data) => {
      enviarNotificacionCamion(`El camión ${data.vehiculoId} está cerca de tu ubicación`);
    });

    socket.on('servicioEspecialCreado', (servicio) => {
      enviarNotificacionServicioEspecial(`Tu servicio especial ha sido registrado para ${new Date(servicio.fecha).toLocaleDateString()}`);
      setServicios(prev => [...prev, servicio]);
    });

    socket.on('servicioEspecialActualizado', (servicio) => {
      enviarNotificacionServicioEspecial(`El estado de tu servicio ha sido actualizado a: ${servicio.estado}`);
      setServicios(prev => prev.map(s => s.id === servicio.id ? servicio : s));
    });

    return () => {
      socket.off('actualizacionUbicacion');
      socket.off('servicioEspecialCreado');
      socket.off('servicioEspecialActualizado');
    };
  }, [socket]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sistema de Notificaciones</h2>
      
      {!permiso && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-yellow-700">
            Por favor, permite las notificaciones para recibir alertas del servicio de recolección.
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Servicios Especiales</h3>
        <button
          onClick={solicitarServicioEspecial}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors mb-4"
        >
          Solicitar Servicio Especial
        </button>

        <div className="space-y-4">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="border rounded p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Servicio {servicio.id}</p>
                  <p className="text-gray-600">
                    Fecha: {new Date(servicio.fecha).toLocaleDateString()}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  servicio.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  servicio.estado === 'confirmado' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {servicio.estado}
                </span>
              </div>
            </div>
          ))}

          {servicios.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No hay servicios especiales registrados
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Configuración de Notificaciones</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={permiso}
              readOnly
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Notificaciones activadas</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NotificacionServicio;
