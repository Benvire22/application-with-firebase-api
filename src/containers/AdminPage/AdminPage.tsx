import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import {Page} from '../../types';
import Spinner from '../../components/Spinner/Spinner';
import Error from '../Error/Error';
import {handleError} from '../../lib/handleError';

const initialState = {
  title: '',
  content: '',
  selected: 'about',
};

interface Content {
  title: string;
  content: string;
  selected: string;
}

const AdminPage = () => {
  const [formData, setFormData] = useState<Content>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const navigate = useNavigate();

  const fetchPage = useCallback(async () => {
    try {
      setLoading(true);
      const {data: apiContent} = await axiosApi.get<Page>(`/${formData.selected}.json`);
      setFormData({...apiContent, selected: formData.selected});

    } catch (e) {
      handleError(e as Error);
      setFormError(true);

    } finally {
      setLoading(false);

    }
  }, [formData.selected]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  const changePageForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendPageForm = async (e: React.FormEvent) => {
   try {
     setLoading(true);
     e.preventDefault();

     const changedPage = {
       title: formData.title,
       content: formData.content,
     };

     await axiosApi.put(`/${formData.selected}.json`, changedPage);

     navigate(`/pages/${formData.selected}`);
   } catch (e) {
     handleError(e as Error);
     setFormError(true);
   } finally {
     setLoading(false);
   }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className="row fs-3 my-5">
        <h1 className="text-primary-emphasis text-center mb-5">Admin Page</h1>
        {formError && <Error />}
        <div className="row mt-2 justify-content-center">
          <div className="col-8">
            <form onSubmit={sendPageForm}>
              <div className="form-group">
                <select
                  className="form-select fs-5 mb-3 py-2"
                  defaultValue={formData.selected}
                  required name="selected"
                  onChange={changePageForm}
                >
                  <option value="about">About</option>
                  <option value="home">Home</option>
                  <option value="contacts">Contacts</option>
                  <option value="policy">Policy</option>
                  <option value="service">Service</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="mb-3 text-primary-emphasis">Title</label>
                <input
                  type="text"
                  name="title"
                  id="name"
                  placeholder="Enter page Title"
                  className="form-control fs-5 mb-3 py-2"
                  value={formData.title}
                  onChange={changePageForm}
                  required
                />
              </div>
              <label htmlFor="content" className="mb-3 text-primary-emphasis">Content</label>
              <textarea
                name="content"
                id="content"
                placeholder="Enter page content"
                className="form-control fs-5 mb-3 py-2"
                value={formData.content}
                onChange={changePageForm}
                rows={10}
                required
              />
              <div className="form-group">
                <button type="submit" className="btn btn-success fs-3 px-5 py-2 mb-5">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;