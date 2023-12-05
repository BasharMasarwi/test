import React from 'react'
import './input.css'
export default function Input({type='text',id,name,title,value,onChange,errors,onBlur,touched}) {
  
  return (
   <>
   <div className="  input-group mb-3 co  ">
<label className='p-3 ' htmlFor={id}>{title}</label>
<input  type={type} name={name} value={value} 
   className="form-control" id={id} onChange={onChange} onBlur={onBlur} />
   {touched[name]&&errors[name]&&<p className='text text-danger p-3'> {errors[name]}</p>}


   </div>
   
   </>
  )
}
