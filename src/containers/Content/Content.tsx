import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect, useState} from 'react';
import axiosApi from '../../axiosApi';
import {Page} from '../../types';
import Spinner from '../../components/Spinner/Spinner';

const Content = () => {
  const [pageContent, setPageContent] = useState<Page | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const {pageName} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pageName) {
      navigate('pages/home');
    }
  }, [pageName]);

  const pagesRequest = useCallback(async () => {
    try {
      setPageLoading(true);
      const {data} = await axiosApi.get<Page>(`/${pageName}.json`);
      console.log(data);

      setPageContent(data);
    } catch (e) {
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
      {pageLoading && <Spinner />}
      {isError ? (
        <h1 className="text-center text-danger">Sorry, unexpected Error was occurred!</h1>
      ) : (
        pageContent ? (
          <div>
            <h1>{pageContent.title}</h1>
            <p>{pageContent.content}</p>
          </div>
        ) : null) // <h1 className="text-center text-danger">Sorry, this page is not a found!</h1>)
      }
    </>
  );
};

export default Content;