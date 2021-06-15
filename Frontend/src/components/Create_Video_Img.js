import React, { useState } from 'react';

import axios from 'axios';

const API_BASE = "http://localhost:8000"

function submitForm(contentType, data, setResponse) {
 axios({
 url: `${API_BASE}/upload-multiple-files`,
 method: 'POST',
 data: data,
 headers: {
 'Content-Type': 'contentType'
 }
 }).then((response) => {
 setResponse(response.data);
 
 console.log(response.data)
 }).catch((error) => {
 setResponse("error");
 })
}


function CreateVideoImg() {
 const [name, setName] = useState("");
 const [video1, setVideo1] = useState(null);
 const [video2, setVideo2] = useState(null);
 const [img1, setImg1] = useState(null);
 const [img2, setImg2] = useState(null);

  const [video01, setVideo01] = useState(null);
 const [video02, setVideo02] = useState(null);

 const [img01, setImg01] = useState(null);
 const [img02, setImg02] = useState(null);

  const [alert, setAlert] = useState(null)
  

 
 function uploadWithFormData(){

    const formData = new FormData();
    formData.append("name", name);
    formData.append("video", video1);
    formData.append("video", video2);
    formData.append("img", img1);
    formData.append("img", img2);
   
   
    submitForm("formdata", formData, (msg) => console.log(msg));
     deleteForm()
 }

 function deleteForm() {
   setImg01(null)
   setImg02(null)
   setVideo01(null)
   setVideo02(null)
   setAlert("Ваши файлы отправленны!") 
   function pin() {
      setAlert(null)
   }
   setInterval(pin, 2000)
}

return (
 <div className="Width_Block">
 <form>
 <label>
 <p>Емаил пользователя которому хотите добавить видео</p>
 <input 
 className="form-control form-control-sm"
 type="text" 
 vaue={name} 
 onChange={(e) => { setName(e.target.value )}} 
 placeholder="Введите Email" />
 </label>

 
<label>
<h6>Добавьте 1-ое видео</h6>
 </label>
 <input 
 className="form-control form-control-sm"
  type="file" name="video" 
  onChange={(e) => {
   const vUrl1 = e.target.files[0]
   const vUrl01 = URL.createObjectURL(vUrl1)

   setVideo1(vUrl1)
   setVideo01(vUrl01)
  }
}
 />
 

 <label>
 <h6>Добавьте 2-ое видео</h6>
 </label>
 <input
 className="form-control form-control-sm"
 type="file" name="video" 
 onChange={(e) => {
   const vUrl2 = e.target.files[0]
   const vUrl02 = URL.createObjectURL(vUrl2)
   setVideo2(vUrl2)
   setVideo02(vUrl02)
 }
} 
/>



 

 <label>
 <h6>Добавьте 1-ое изображение</h6>
 </label>


<input 
 className="form-control form-control-sm"
 type="file" name="img" 
 onChange={(e) => {
   const iUrl1 = e.target.files[0]
   const iUrl01 = URL.createObjectURL(iUrl1)
   setImg1(iUrl1)
   setImg01(iUrl01)
 }
} 
 />


<label>
 <h6>Добавьте 2-ое изображение</h6>
 </label>
 <input
 className="form-control form-control-sm"
 type="file" name="img" 
 onChange={(e) => {
   const iUrl2 = e.target.files[0]
   const iUrl02 = URL.createObjectURL(iUrl2)
   setImg2(iUrl2)
   setImg02(iUrl02)
 }
}
  />
 
<input
 className="btn btn-success margin-top"
 type="button"
  value="Отправить файлы"
   onClick={uploadWithFormData}
    />
</form>

 {alert && (
          
          <h5 className="Alert">{alert}</h5>
        
      )}  


    <div className="flex">


   {video01 && (
          
          <video src={video01} alt="preview" width="150" hieght="150" controls/>
        
      )} 
       {video02 && (
          
          <video src={video02} alt="preview" width="150" hieght="150" controls/>
        
      )} 
   {img01 && (
          
          <img src={img01} alt="preview" width="150" hieght="150" />
        
      )} 

{img02 && (
        
          <img src={img02} alt="preview" width="150" hieght="150" />
        
      )} 
   </div>   

      


 
</div>
 );
}

export default CreateVideoImg;