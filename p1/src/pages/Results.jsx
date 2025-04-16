import { useLocation, useNavigate } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const text = location.state?.text || '';

  const fakeSentiment = text.includes('feliz') ? 'Positivo 😀' : 'Negativo 😞';

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Resultado del Análisis</h1>
      <div className="card shadow p-4">
        <p><strong>Texto ingresado:</strong></p>
        <p className="bg-light p-3 rounded">{text}</p>
        <p className="mt-3"><strong>Sentimiento detectado:</strong> <span className="text-success">{fakeSentiment}</span></p>
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;