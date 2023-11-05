import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function ShowMovies() {
    const navigate = useNavigate();
    const [moviesList,setMoviesList]=useState([])
const GetAllMovies=()=>{
    const token = window.localStorage.getItem("token");
    const apiUrl = 'http://localhost:3008/movies'; 
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
    setMoviesList(response.data)
    console.log('Data received:', response.data);
  })
  .catch((error) => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
}

function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      // If the string is longer than the maximum length, truncate it
      return str.slice(0, maxLength) + '...'; // You can add ellipsis (...) to indicate truncation
    } else {
      // If the string is within the maximum length, display it as is
      return str;
    }
  }
  const handleDetailButtonClick=(index)=>{
    navigate(`${index._id}` , {state:{data:index}})
  }
useEffect(()=>{
    GetAllMovies()
},[])
  return (
    <div className='p-5 container '>
        <h1 className='fw-bold text-center text-primary'>All Movies List</h1>
     <div className='row'>

        {moviesList.length !=0 ? moviesList.map((index)=>{
     return    (<>
         
         <div className='col-lg-3 col-md-4 col-sm-12 mb-3'>
<div className="card " style={{width: '18rem'}}>
  <div className="card-body">
    <h5 className="card-title">{index.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{index.category}</h6>
    <p className="card-text">{truncateString(index.description, 100)}</p>
   <button className='btn btn-primary' onClick={()=>handleDetailButtonClick(index)}>View More</button>
    {/* <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
</div></>)
        }) : <p>Please Enter Record of Movies</p>}

     </div>
    </div>
  )
}

export default ShowMovies
