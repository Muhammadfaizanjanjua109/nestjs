import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ApiCall from '../../components/ApiCall'
import axios from 'axios'

function SignUp() {
    const SERVER_DEVELOP=process.env.SERVER_DEVELOP
    const navigate=useNavigate()
    const [form, setForm] = useState({
        username: '',
        address: '',
        password: '',
    })

  const  handleChange = (e) => {
        const { value, name } = e.target
        setForm((prev) => (
            { ...prev, [name]: value }
        ))
    }

const handleSignUpAPi=()=>{
const apiUrl = `${SERVER_DEVELOP}/auth/signup`; 
axios
  .post(apiUrl, form)
  .then((response) => {
     console.log('User created successfully:',
      response.data ) 
      navigate('/auth/Login')
      ;})
  .catch((error) => {console.error('Error creating user:', error);
  });
    }
    return (
        <>
            <div className='mt-4 mb-4'>

                <div className='mb-2'>
                    <input className='form-control' onChange={(e)=>handleChange(e)} name='username' placeholder='Username' />
                </div>


                <div className='mb-2'>
                    <input className='form-control' onChange={(e)=>handleChange(e)} name='address' placeholder='Address' />

                </div>


                <div className='mb-2'>
                    <input className='form-control' onChange={(e)=>handleChange(e)} name='password' placeholder='Password' />

                </div>
            </div>

            <div class="container-login100-form-btn">
                <div class="wrap-login100-form-btn">
                    <div class="login100-form-bgbtn"></div>
                    <button class="login100-form-btn" onClick={()=>handleSignUpAPi()}>
                        Sign Up
                    </button>
                </div>
            </div>
            <div class="text-center p-t-115">
                <span class="txt1">
                    Already have an account?
                </span>

                <Link class="txt2" to="/auth/Signup">
                    Sign In
                </Link>

            </div>
        </>
    )
}

export default SignUp
