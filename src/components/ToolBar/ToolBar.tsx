import {NavLink} from 'react-router-dom';

const ToolBar = () => {
  return (
    <>
      <nav className="navbar py-3 navbar-expand-lg bg-primary" data-bs-theme="dark">
        <div className="container-xl">
          <NavLink to="/pages/home" className="navbar-brand">
          </NavLink>
          <button
            className="navbar-toggler"
            type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto gap-4 fs-4">
              <li className="nav-item">
                <NavLink to="/pages/home" className="nav-link" aria-current="page">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pages/about" className="nav-link">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pages/contacts" className="nav-link">Contacts</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pages/service" className="nav-link">Our Service</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pages/policy" className="nav-link">Policy</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pages/admin" className="nav-link">Admin</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ToolBar;