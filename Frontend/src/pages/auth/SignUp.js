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
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    if (!form.username.trim() || !form.address.trim() || !form.password.trim()) {
      setError('Please fill in all fields');
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
      axios.post(apiUrl, form)
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
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='username'
            placeholder='Username'
          />
        </div>

        <div className='mb-2'>
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='address'
            placeholder='Address'
          />
        </div>

        <div className='mb-2'>
          <input
            className='form-control'
            onChange={(e) => handleChange(e)}
            name='password'
            placeholder='Password'
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
