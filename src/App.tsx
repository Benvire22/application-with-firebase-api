import './App.css';
import {Link, Route, Routes} from 'react-router-dom';
import Content from './containers/Content/Content';
import AdminPage from './containers/AdminPage/AdminPage';

const App = () => {
  return (
    <>
      <div>
        <ul>
          <li><Link to="/pages/home">Home</Link></li>
          <li><Link to="/pages/about">About</Link></li>
          <li><Link to="/pages/service">Our service</Link></li>
          <li><Link to="/pages/contacts">Contacts</Link></li>
          <li><Link to="/pages/policy">Policy</Link></li>
          <li><Link to="/pages/admin">Admin Page</Link></li>
        </ul>
      </div>
      <main className="container-xl">
        <Routes>
          <Route path="/" element={<Content/>}/>
          <Route path="pages/:pageName" element={<Content/>}/>
          <Route path="pages/admin" element={<AdminPage/>}/>
          <Route path="*" element={<h1 className="text-center text-danger">Sorry, this page is not a found!</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;