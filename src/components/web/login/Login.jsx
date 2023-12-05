import React from 'react'
import Input from '../../pages/Input.jsx'
import { useFormik } from 'formik';
import { loginSchema } from '../validate/validate.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Login({saveCurrentUser}) {
    const navigate = useNavigate();
    const  initialValues={
            email:'',
            password:'',   
    };
    
 const onSubmit= async users=>{
       
       const {data}= await axios.post('https://ecommerce-node4.vercel.app/auth/signin',users);
       console.log(data);
       if(data.message=='success'){
      localStorage.setItem("userToken",data.token);
      saveCurrentUser();
        toast.success('login succesfuly ', {
            position: "top-right",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            navigate('/home')
       }
       }
    const formik =useFormik({
        initialValues,
          onSubmit,
          validationSchema:loginSchema
        });
    const inputs=[
      
        {
            id:'email',
            type:'email',
            name:'email',
            title:'User Email',
            value:formik.values.email,
        },
        {
            id:'password',
            type:'password',
            name:'password',
            title:'User Password',
            value:formik.values.password,
        },
      
        
    ];
    const renderInputs=inputs.map((input,index)=>
       <Input 
       type={input.type}
        id={input.id} 
        name={input.name}
         title ={input.title} 
         value={input.value} 
          key={index}
          errors={formik.errors}
          onChange={ formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          /> 
    )

  return (
    <>
    <div className='container '>
        <h2 > login</h2>
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {renderInputs}
            <button type='submit' disabled={!formik.isValid} className='bg-info rounded '>Login</button>
        </form>
    </div>
    </>
  )
  }
