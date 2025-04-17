import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = (e) => {
    e.preventDefault();
    navigate('/results', { state: { text } });
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-4">Análisis de Sentimientos</h1>
        <form onSubmit={handleAnalyze}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Escribe algo para analizar..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Analizar Sentimiento
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;