import React, {ChangeEvent, useState} from 'react';
import axiosApi from '../../axiosApi';
import {useNavigate} from 'react-router-dom';

const initialState = {
  title: '',
  content: '',
  selected: '',
};

interface Content {
  title: string;
  content: string;
  selected: string;
}

const AdminPage = () => {
  const [formData, setFormData] = useState<Content>(initialState);
  const navigate = useNavigate();

  const handleSelectChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevState) => ({...prevState, selected: e.target.value}));

    if (e.target.value !== '') {
      const {data: apiContent} =  await axiosApi.get<Content>(`/${e.target.value}.json`);
      setFormData({...apiContent, selected: e.target.value});
    }
  };

  const changePageForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosApi.put(`/${formData.selected}.json`, {
      title: formData.title,
      content: formData.content,
    });

    navigate(`/pages/${formData.selected}`);
  };

  return (
    <>
      <h1>Admin Page</h1>
      <form onSubmit={handleSave}>
        <label>Select Page: </label>
        <select defaultValue="" required name="page" onChange={handleSelectChange}>
          <option value="" disabled>Select page</option>
          <option value="about">About</option>
          <option value="home">Home</option>
          <option value="service">Service</option>
        </select>
        <input type="text" name="title" required value={formData.title} onChange={changePageForm}/>
        <textarea name="content" required value={formData.content} onChange={changePageForm}/>
        <button onClick={handleSave}>Save</button>
      </form>
    </>
  );
};

export default AdminPage;