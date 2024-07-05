import './App.css';
import {Route, Routes} from 'react-router-dom';
import Content from './containers/Content/Content';

const App = () => {
  return (
    <>
     <Routes>
       <Route path="/pages/:pageName" element={<Content />} />
     </Routes>
    </>
  );
};

export default App;