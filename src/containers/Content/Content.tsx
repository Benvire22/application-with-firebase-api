import {useParams} from 'react-router-dom';

const Content = () => {
  const {pageName} = useParams();

  return (
    <div>
      <h1>{pageName || 'Home'}</h1>
    </div>
  );
};

export default Content;