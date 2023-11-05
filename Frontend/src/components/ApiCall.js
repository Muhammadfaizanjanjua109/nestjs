
import axios from "axios";
function ApiCall(method,url ,data ) {

    const SERVER_DEVELOP = process.env.SERVER_DEVELOP;

    // Create an Axios instance with the common headers
const axiosInstance = axios.create({
    baseURL:`${SERVER_DEVELOP}`,
    headers: {
      'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${jwtToken}`, // Send the Bearer token in the header
    },
  });
  
  // Make the API request to auth/sign

  switch (method) {
    case 'Post':
        axiosInstance
        .post(`http://localhost:3008/${url}`, {   ...data})
        .then((response) => {
          // Handle the response from the server
          console.log('Response:', response.data);
        })
        .catch((error) => {
          // Handle errors
          console.error('Error:', error);
        });
        break;
  
    default:
        break;
  }

  

}

export default ApiCall
