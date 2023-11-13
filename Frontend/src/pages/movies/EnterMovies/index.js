import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EnterMovies() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    IDMRating: '',
    description: '',
    name: '',
    category: '',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInAPi = () => {
    if (!form.name || !form.description || !form.IDMRating || !form.category) {
      toast('All fields are required');
      return;
    }

    const apiUrl = `${process.env.REACT_APP_BASE_URL}movies`;
    const respo = {
      IDMRating: form?.IDMRating,
      description: form?.description,
      name: form?.name,
      category: form.category,
    };

    axios
      .post(apiUrl, respo)
      .then((response) => {
        setForm({
          IDMRating: '',
          description: '',
          name: '',
          category: '',
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:'calc(100vh - 70px)'}}>
      <div className="card p-4 w-50">
        <h3 className="text-center text-primary fw-bolder">Add Movie Record</h3>
        <div className="mt-4 mb-4">
          <div className="mb-2">
            <label htmlFor="name">Name<span className='text-danger'>*</span></label>
            <input
              id="name"
              className="form-control"
              value={form.name}
              onChange={(e) => handleChange(e)}
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="description">Description<span className='text-danger'>*</span></label>
            <textarea
              id="description"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={form.description}
              name="description"
              placeholder="Description"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="IDMRating">IDMRating<span className='text-danger'>*</span></label>
            <input
              id="IDMRating"
              className="form-control"
              value={form.IDMRating}
              onChange={(e) => handleChange(e)}
              name="IDMRating"
              placeholder="IDMRating"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              className="form-control"
              value={form.category}
              onChange={(e) => handleChange(e)}
              name="category"
              required
            >
              <option value="" disabled>
                Select a category<span className='text-danger'>*</span>
              </option>
              <option value={'Adventure'}>Adventure</option>
              <option value={'Horror'}>Horror</option>
              <option value={'Crime'}>Crime</option>
              <option value={'Animated'}>Animated</option>
            </select>
          </div>
        </div>

      <div className='d-flex'>
      <button className="btn btn-primary text-light me-3" onClick={() => handleSignInAPi()}>
      <i class="bi bi-floppy-fill"></i>   Create
        </button>

        <Link to="../Movies" className="btn btn-secondary text-light">
        <i class="bi bi-arrow-left-circle-fill"></i>  Go Back
        </Link>
      </div>
      </div>
    </div>
  );
}

export default EnterMovies;
