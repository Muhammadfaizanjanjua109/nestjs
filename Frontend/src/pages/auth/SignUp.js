import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    address: '',
    password: '',
    profileImage: null,
    category:'',
  });

  const [selectedCategories, setSelectedCategories] = useState([]);

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value, name, files } = e.target;
    if (name === 'profileImage') {
      // const reader = new FileReader();
      

      setFile(e.target.files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategories(Array.from(e.target.selectedOptions, (option) => option.value));
  };

  const validateInputs = () => {
    if (
      !form.username.trim() ||
      !form.address.trim() ||
      !form.password.trim() ||
      !form.password.trim() ||
      !file
    ) {
      setError('Please fill in all fields and select at least one category and upload a profile image');
      return false;
    }
    setError('');
    return true;
  };







  const handleSignUpAPI = () => {
    try {
      if (!validateInputs()) {
        return;
      }

      const apiUrl = `${REACT_APP_BASE_URL}auth/signup`;
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('address', form.address);
      formData.append('password', form.password);
      formData.append('image', file);
      formData.append('category', form.category);

      axios.post(apiUrl, formData)
        .then((response) => {
          console.log('User created successfully:', response.data);
          navigate('/');
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          setError(error.response?.data?.message || 'An error occurred');
        });
    } catch (error) {
      console.error('Error creating user:', error);
      setError('An unexpected error occurred');
    }
  };
 

  return (
    <>
      <div className='mt-4 mb-4'>
        <div className='mb-2'>
        <label>Username:</label>
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='username'
            placeholder='Enter Username'
          />
        </div>

        <div className='mb-2'>
        <label>Address:</label>
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='address'
            placeholder='Enter Address'
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








        <div className='mb-2'>
        <label>Password:</label>
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='password'
            placeholder='Enter Password'
          />
        </div>


        <div className='mb-2'>
        <label>Profile Image:</label>
        <input
          type='file'
          className='form-control'
          accept="image/*"
          name='profileImage'
          onChange={(e) => handleChange(e)}
        />
      </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" onClick={() => handleSignUpAPI()}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="text-center p-t-115">
        <span className="txt1">Already have an account?</span>
        <Link className="txt2" to="/">
          Sign In
        </Link>
      </div>
    </>
  );
}

export default SignUp;
