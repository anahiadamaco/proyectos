import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'; // Asegúrate de importar el Navbar

const Historial = () => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Hacer la solicitud para obtener el historial
    fetch('http://localhost:8000/historial')
      .then((res) => res.json())
      .then((data) => {
        setHistorial(data);
      })
      .catch((err) => {
        console.error('Error al obtener el historial:', err);
      });
  }, []);

  return (
    <div>
      <Navbar /> {/* Incluye el Navbar aquí */}
      <div className="container mt-5">
        <h1 className="text-center mb-4">Historial de Análisis</h1>
        <div className="list-group">
          {historial.length === 0 ? (
            <p className="text-center">No hay análisis en el historial.</p>
          ) : (
            historial.map((item) => (
              <div key={item.id} className="list-group-item">
                <p><strong>Texto:</strong> {item.texto}</p>
                <p><strong>Sentimiento:</strong> {item.sentimiento}</p>
                <p><strong>Polaridad:</strong> {item.polaridad}</p>
                <p><strong>Fecha:</strong> {item.fecha}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Historial;