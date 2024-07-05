import {Route, Routes} from 'react-router-dom';
import ContentPage from './containers/ContentPage/ContentPage';
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
          <Route path="/" element={<ContentPage />}/>
          <Route path="pages/:pageName" element={<ContentPage />}/>
          <Route path="pages/admin" element={<AdminPage />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;