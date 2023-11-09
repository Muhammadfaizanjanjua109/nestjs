import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
    const REACT_APP_BASE_URL=process.env.REACT_APP_BASE_URL
 
    const navigate=useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const  handleChange = (e) => {
        const { value, name } = e.target
        setForm((prev) => (
            { ...prev, [name]: value }
        ))
    }

    const validateInputs = () => {
        if (!form.username.trim() || !form.password.trim()) {
          toast.error('Please enter both username and password');
          return false;
        }
        return true;
      };
    


    const handleSignInAPi = async () => {
        if (!validateInputs()) {
            return;
          }
    
        try {
         
          const apiUrl = `${REACT_APP_BASE_URL}auth/login`; 
          axios
            .post(apiUrl, form)
            .then((response) => {
                toast.success('Login successful!');
               console.log('User created successfully:',
               response.data.access_token ) 
                window.localStorage.setItem("authUser", response.data.access_token);
                window.localStorage.setItem("token", response.data.access_token);
                navigate('/movies')
                ;}).catch((error)=>{
                    debugger
                    if (error.response) {
                    
                        toast.error(error.response?.data?.error || 'An error occurred');
                      } else if (error.request) {
                        // The request was made but no response was received
                        toast.error('No response from the server');
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        toast.error('An error occurred while processing the request');
                      }
                })

             
        } catch (error) {
            toast.error('An error occurred while processing the request');
         
          
        }
      };





  return (
    <div>





<div className='mt-4 mb-4'>

<div className='mb-2'>
    <input className='form-control' onChange={(e)=>handleChange(e)} name='username' placeholder='Username' />
</div>



<div className='mb-2'>
    <input className='form-control' onChange={(e)=>handleChange(e)} name='password' type='password' placeholder='Password' />

</div>
</div>

<div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn" onClick={()=>handleSignInAPi()}>
                        Login
                    </button>
                </div>
            </div>


                            <div class="text-center p-t-115">
                                <span class="txt1">
                                    Don’t have an account?
                                </span>
                                <Link class="txt2" to="/Signup">
                                    Sign Up
                                </Link>
                            </div>
    </div>
  )
}

export default Login
