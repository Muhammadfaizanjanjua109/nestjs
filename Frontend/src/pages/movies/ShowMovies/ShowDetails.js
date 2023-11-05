import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import RatingComponent from '../../../components/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';

function ShowDetails() {
    const navigate = useNavigate();

    const location = useLocation();
    const [moviesList,setMoviesList]=useState([])
    const [data, setData] = useState({

    });
    const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
   



    const token = window.localStorage.getItem('token');
    const apiUrl = 'http://localhost:3008/Rating';
    
    const customHeaders = {
      'Authorization': `Bearer ${token}`,
    };
    
    // Data to be sent in the PUT request
    const requestData = {
      movie: data?._id,
      value: userRating,
    };
    
    // Make the GET request
    axios
    .put(apiUrl, requestData, { headers: customHeaders })
    .then((response) => {
      // Handle the success response
      console.log('PUT request successful:', response.data);
      toast.success('Rating Updated')
    })
    .catch((error) => {
      // Handle errors
      console.error('Error making PUT request:', error);
    });




  };

    useEffect(() => {
      if (location.state && location.state.data) {
        setData(location.state.data);
      }
    }, [location]);

const GetAllMovies=()=>{
    const token = window.localStorage.getItem("token");
    const apiUrl = 'http://localhost:3008/Rating'; 
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


    useEffect(() => {
        GetAllMovies()
      }, []);
  return (
    <div className='p-5'>
<div className='d-flex'>
<button className='btn btn-primary me-4' onClick={()=>navigate('../../Movies')}>Back</button>
<h2>Name: {data.name}</h2>
</div>
<hr />
     <div className='row'>
<div className='col-lg-6 col-md-6 col-sm-12'>
    <h5>Detials of Movie</h5>
    {data.description}
</div>
<div className='col-lg-6 col-md-6 col-sm-12'>
    <h5>Name: {data.name}</h5>
    <h5> IDMRating :{data.IDMRating}</h5>
    <span className='badge badge-primary text-light'> {data.category}</span>
    <RatingComponent onRatingChange={handleRatingChange} />
      <p>User Rating: {userRating}</p>
</div>


     </div>

<hr />
     <div className='container'>
        <h5 className='mt-5 text-primary fw-bold mb-4'>Recommended Movies For You</h5>
<div className='row'>
{moviesList.map((index)=>{
     return    (<>
         
         <div className='col-lg-3 col-md-4 col-sm-12 mb-3'>
<div className="card " style={{width: '18rem'}}>
  <div className="card-body">
    <h5 className="card-title">{index.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{index.category}</h6>
    <p className="card-text">{truncateString(index.description, 100)}</p>
   {/* <button className='btn btn-primary' onClick={()=>handleDetailButtonClick(index)}>View More</button> */}
    {/* <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
</div></>)
        })}
</div>
     </div>
    </div>
  )
}

export default ShowDetails
