import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ViewMovies() {
    const navigate=useNavigate()
  return (


<>


    <div className='d-flex justify-content-center align-items-center w-100 h-100 flex-column' style={{minHeight:'calc(100vh - 70px)'}}>











  <>
  <h1 className='fw-bold mb-3 text-secondary '>Select  Option</h1>
  <div class="card mb-3" style={{maxWidth: '540px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://fiverr-res.cloudinary.com/image/upload/w_880/f_auto,q_auto/v1/attachments/generic_asset/asset/dd37ef4516d9f9b0a573839fbc3e688d-1640084728741/Data%20entry-min.jpg" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold text-primary">Enter Movies Record</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary"><button className='btn btn-primary' onClick={()=>navigate('/EnterMovies')}>Click Here</button></small></p>
      </div>
    </div>
  </div>
</div>





<div class="card mb-3" style={{maxWidth: '540px'}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://www.powerreviews.com/wp-content/uploads/2021/12/review-vol-rec.png" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold text-primary">View Movies Records and rate</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-body-secondary"><button className='btn btn-primary' onClick={()=>navigate('/ShowMovies')}>Click Here</button></small></p>
      </div>
    </div>
  </div>
</div>
  </>
    </div>
</>
  )
}

export default ViewMovies
