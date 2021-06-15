import React, { useState, useEffect } from 'react'


import '../components/Get.css'
import'../App.css'



function Get() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8000")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  
  

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
  } else {
    return (

      <div className="Block">
      {items.map(item => (
        <div className="User_Block" key={item.id}>
          <div className="User_Block_Fon">
            <div className="ID">{item.id}</div>
          <p>Name <b>{item.first_name}</b></p>
          <p>Email <b>{item.email}</b></p>
          <p>Phone <b>{item.phone}</b></p>
          </div>
          
         {/* <video src={http + item.url} controls/>  */}
        </div>
      ))}
      </div>
    
     
      );
     }
   }

 

   
    export default Get;