import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Page} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../Error/Error';
import {handleError} from '../../lib/handleError';

const Content = () => {
  const [pageContent, setPageContent] = useState<Page | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {pageName} = useParams();
  const navigate = useNavigate();

  if (!pageName) {
    navigate('pages/home');
  }

  const pagesRequest = useCallback(async () => {
    try {
      setPageLoading(true);
      if (pageName) {
        const {data} = await axiosApi.get<Page>(`/${pageName}.json`);
        setPageContent(data);
      } else {
        const {data} = await axiosApi.get<Page>(`/home.json`);
        setPageContent(data);
      }

    } catch (e) {
      handleError(e as Error);
      setIsError(true);
    } finally {
      setPageLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void pagesRequest();
  }, [pagesRequest]);

  return (
    <>
      {pageLoading && <Spinner/>}
      {isError ? (
        <Error />
      ) : (
        pageContent && (
          <div className="row my-5">
            <h1 className="text-primary-emphasis text-center mb-5">{pageContent.title}</h1>
            <p className="fs-3">{pageContent.content}</p>
          </div>)
      )}
    </>
  );
};

export default Content;