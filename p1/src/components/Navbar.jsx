import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Análisis de Sentimientos</a>
        <div className="d-flex">
          <Link to="/" className="btn btn-primary me-2">Escribir Comentario</Link>
          <Link to="/historial" className="btn btn-secondary">Historial</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;