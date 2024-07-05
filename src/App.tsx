import './App.css';
import {Route, Routes} from 'react-router-dom';
import Content from './containers/Content/Content';
import AdminPage from './containers/AdminPage/AdminPage';
import ToolBar from './components/ToolBar/ToolBar';
import NotFound from './containers/NotFound/NotFound';

const App = () => {
  return (
    <>
      <header>
        <ToolBar />
      </header>
      <main className="container-xl my-3">
        <Routes>
          <Route path="/" element={<Content/>}/>
          <Route path="pages/:pageName" element={<Content/>}/>
          <Route path="pages/admin" element={<AdminPage/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;