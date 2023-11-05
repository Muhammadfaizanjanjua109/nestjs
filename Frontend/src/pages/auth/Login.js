import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const SERVER_DEVELOP=process.env.SERVER_DEVELOP
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



    const handleSignInAPi=()=>{
        const apiUrl = `http://localhost:3008/auth/login`; 
        axios
          .post(apiUrl, form)
          .then((response) => {
             console.log('User created successfully:',
             response.data.access_token ) 
              window.localStorage.setItem("authUser", response.data.access_token);
              window.localStorage.setItem("token", response.data.access_token);
              navigate('/movies')
              ;})
          .catch((error) => {console.error('Error creating user:', error);
          });
            }
  return (
    <div>





<div className='mt-4 mb-4'>

<div className='mb-2'>
    <input className='form-control' onChange={(e)=>handleChange(e)} name='username' placeholder='Username' />
</div>



<div className='mb-2'>
    <input className='form-control' onChange={(e)=>handleChange(e)} name='password' placeholder='Password' />

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
                                <Link class="txt2" to="/auth/Signup">
                                    Sign Up
                                </Link>
                            </div>
    </div>
  )
}

export default Login
