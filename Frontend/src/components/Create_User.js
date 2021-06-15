import React, { useState } from 'react'
 import axios from "axios"




function Component_Post_Create_User() {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
   const [data, setData] = useState(null);
 
  const handleSubmit = () => {
    setLoading(true);
    setIsError(false);
    const data = {
      name: name,
      email: email,
      phone: phone
    }
    axios.post('http://localhost:8000/user_lists', data).then(res => {
      setData(res.data);
      setName('');
      setEmail('');
      setPhone('');
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      setIsError(true);
    });
  }
 
  return (

    

    <div className="Form_Block">
      <h3>Добавить пользователя</h3>

     

      {/* <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">Мастер</option>
            <option value="2">Менеджер</option>
            <option value="3">Пилот</option>
      </select> */}

        <div classNames="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)} />
        </div>
        <div classNames="form-group">
          <label htmlFor="email" className="mt-2">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        </div>
        <div classNames="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={e => setPhone(e.target.value)} />
        </div>
        {isError && <small className="mt-3 d-inline-block text-danger"></small>}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={handleSubmit}
          disabled={loading}
        >{loading ? 'Загрузка...' : 'Отправить'}</button>
        {data && <div className="mt-3">
          <strong>Output:</strong><br />
          <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        }
      </div>
  );
}
 
export default Component_Post_Create_User;