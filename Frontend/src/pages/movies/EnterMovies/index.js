import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function EnterMovies() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        IDMRating: '',
        description: '',
        name: '',
        category: '',
    })
        const handleChange = (e) => {
            
        const { value, name } = e.target

        setForm((prev) => (
            { ...prev, [name]: value }
        ))
    }
    const handleSignInAPi = () => {
        const apiUrl = `http://localhost:3008/movies`;
        const respo = {
            IDMRating: form?.IDMRating,
            description: form?.description,
            name: form?.name,
            category: form.category,
        }
        axios
            .post(apiUrl, respo)
            .then((response) => {

                setForm({
                    IDMRating: '',
                    description: '',
                    name: '',
                    category: '',
                })
                
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }} >
            <div className='card p-4 w-50' >
                <h3 className='text-center text-primary fw-bolder'>Add Movie Record</h3>
                <div className='mt-4 mb-4'>

                    <div className='mb-2'>
                        <label>Name</label>
                        <input className='form-control'  value={form.name} onChange={(e) => handleChange(e)} name='name' placeholder='Name' />
                    </div>
                    <div className='mb-2'>
                        <label>Description</label>
                        <textarea className='form-control' onChange={(e) => handleChange(e)} value={form.description} name='description' placeholder='Description' />
                    </div>
                    <div className='mb-2'>
                        <label>IDMRating</label>
                        <input className='form-control'  value={form.IDMRating}  onChange={(e) => handleChange(e)} name='IDMRating' placeholder='IDMRating' />
                    </div>
                    <div className='mb-2'>
                        <label>Category</label>
                        <select className='form-control'  value={form.category} onChange={(e) => handleChange(e)} name='category' placeholder='category'>
                            <option value={'Adventure'}>
                                Adventure
                            </option>
                            <option value={'Horror'}>
                                Horror
                            </option>
                            <option value={'Crime'}>
                                Crime
                            </option>
                            <option value={'Animated'}>
                                Animated
                            </option>
                        </select>
                    </div>
                </div>


                <button className='btn btn-primary text-light' onClick={()=>handleSignInAPi()}>
                Create
                </button>


                <button className='btn btn-secondary text-light mt-3' onClick={()=>navigate('../Movies')}>
                Go Back
                </button>

            </div>
        </div>
    )
}

export default EnterMovies
