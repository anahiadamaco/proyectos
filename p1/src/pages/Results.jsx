import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const text = location.state?.text || '';

  const [sentimiento, setSentimiento] = useState(null);
  const [polaridad, setPolaridad] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (text) {
      fetch('http://localhost:8000/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto: text }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSentimiento(data.sentimiento);
          setPolaridad(data.polaridad);
          setCargando(false);
        })
        .catch((err) => {
          console.error('Error al analizar:', err);
          setSentimiento('Error al conectar con el servidor.');
          setCargando(false);
        });
    }
  }, [text]);

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Resultado del Análisis</h1>

        {cargando ? (
          <p className="text-center">Analizando texto...</p>
        ) : (
          <div className="card shadow p-4">
            <p><strong>Texto ingresado:</strong></p>
            <p className="bg-light p-3 rounded">{text}</p>
            <p className="mt-3"><strong>Sentimiento detectado:</strong> {sentimiento}</p>
            <p><strong>Polaridad:</strong> {polaridad}</p>
            <div className="text-center mt-4">
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Results;