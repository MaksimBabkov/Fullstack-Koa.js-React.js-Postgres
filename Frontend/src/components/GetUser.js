import React, { useState } from 'react'
import axios from "axios"

import '../App.css'

const http = 'http://localhost:8000/'


function GetUser() {
 
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
   const [data, setData] = useState(null);
 
  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      email: email
    }
    axios.post('http://localhost:8000/video_lists', data).then(res => {
      setData(res.data);
      
      setEmail('');
      
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
 
  return (

    <div className="Form_Block">
      <h3>Получить файлы пользователя</h3>
       
        <div classNames="form-group">
          <label htmlFor="email" className="mt-2">Email</label>
          <input
            type="text"
            autocomplete="off"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}/>
        </div>
       
        {isError && <small className="mt-3 d-inline-block text-danger"></small>}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >{loading ? 'Загрузка...' : 'Отправить'}</button>
        {data && <div className="mt-3">
          <strong>Файлы...</strong><br />

<div className="my-flex-cont">

<div className="my-flex-box">
            <h4>Видео</h4>
      {data.map(dataitem => (
        <div  key={dataitem.id}>
          {/* <img width="300px" src={http + dataitem.img}/> */}
          <video width="300px"  src={http + dataitem.url} controls/>
        </div>
      ))}
      </div>

      <div className="my-flex-box">
        <h4>Изображения</h4>
      {data.map(dataitem => (
        <div  key={dataitem.id}>
          <img width="300px"  src={http + dataitem.img}/>
          {/* <video width="300px" src={http + dataitem.url} controls/> */}
        </div>
      ))}
      </div>


</div>

         


          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          </div>
        }
      </div>
  );
}
 
export default GetUser;