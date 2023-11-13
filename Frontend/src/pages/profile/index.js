




import React, { useState  ,useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ProfilePage() {
  const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();






  const [form, setForm] = useState({
    username: '',
    address: '',
    password: '',
    profileImage: null,
    category:'',
  });


 
 
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





useEffect(()=>{
    GetAllUserData()
},[])

const GetAllUserData=()=>{
    const token = window.localStorage.getItem("token");
    const apiUrl = `${process.env.REACT_APP_BASE_URL}auth/user` ; 
    const customHeaders = {
        'Authorization': `Bearer ${token}`, 
      };
// Make the GET request
axios
  .get(apiUrl , {
    headers: customHeaders,
  })
  .then((response) => {
    // Handle the success response
debugger
    setForm({
        username: response?.data?.username,
        address: response?.data?.address,
        // password: response?.data?.password,
        profileImage: response?.data?.image,
        category:response?.data?.category,
      })
    
    

  
    console.log('Data received:', response.data);
  })
  .catch((error) => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
}









const handleUpdateAPI = () => {
    try {
      const token = window.localStorage.getItem('token');
      const customHeaders = {
        'Authorization': `Bearer ${token}`, 
      };
  
      const apiUrl = `${REACT_APP_BASE_URL}auth/update_profile`;
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('address', form.address);
    {form.password !='' && formData.append('password', form.password); }  
      formData.append('image', file);
      formData.append('category', form.category);
  
      axios.patch(apiUrl, formData, { headers: customHeaders }) // Include headers in the request
        .then((response) => {
          toast.success('User record updated successfully');
          GetAllUserData();
          console.log('User updated successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          setError(error.response?.data?.message || 'An error occurred');
        });
    } catch (error) {
      console.error('Error updating user:', error);
      setError('An unexpected error occurred');
    }
  };
  
  const handleImageClick = () => {
    document.getElementById('profileImageInput').click();
  };

  return (
    <>
   <div className=' container p-4 d-flex justify-content-center align-items-center flex-column'>
   <div className='mt-4 mb-4 card p-4'>
        <div className='mb-2'>
        <label>Username:</label>
          <input
            className='form-control'
            value={form.username}
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
            value={form.address}
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
            type='password'
            
            autocomplete="off"
            value={form.password}
            placeholder='Enter Password'
          />
        </div>

        <div className='mb-2' onClick={()=>handleImageClick()} style={{ cursor: 'pointer' }}>
        <label>Profile Image:</label>

        {file ==null &&  <img
          src={`${REACT_APP_BASE_URL}${form.profileImage}`} // Use the URL of the uploaded image
          alt='Profile'
          className='form-control' // You can adjust the styling as needed
        />}
       
        <input
          type='file'
          id='profileImageInput'
          accept='image/*'
          name='profileImage'
          onChange={(e) => handleChange(e)}
          style={file ==null ? { display: 'none' } : {}} // Hide the file input
        />
      </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div className="container-login100-form-btn">
        <div className="wrap-login100-form-btn">
          <div className="login100-form-bgbtn"></div>
          <button className="login100-form-btn" onClick={() => handleUpdateAPI()}>
          Update Information
          </button>
        </div>
      </div>
   </div>
    
    </>
  );
}

export default ProfilePage;
