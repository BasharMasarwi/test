import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';
import './product.css'
export default function Product() {
   const {productId} =useParams();
   const getProduct= async ()=>{
   const {data}= await axios.get (`${import.meta.env.VITE_API_URL}/products/${productId}`);
   return data.product;
 }

   const {data , isLoading}=useQuery('product',getProduct);
    if(isLoading){
        return <p>...Loading</p>
    }
  return (
    <>
    <div className="container">
     <div className="row">
      <div className="col-md-4 im">
      {data.subImages.map((img,index)=>
       <React.Fragment key={index}>
       <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: img.secure_url 
    },
    largeImage: {
        src: img.secure_url,
        width: 500,
        height: 500
    },
   // enlargedImagePosition:'over',
   
    isHintEnabled:true,
  
}} />
       </React.Fragment>
       
      )}
      </div>
      <div className="col-md-4 mt-5  ">
         <h2 className='fs-5'><span className='fs-5'>Name Product: </span>{data.name}</h2>
         <p ><span className='fs-5'>Description Product: </span>{data.description}</p> 
         <h3 className='fs-5'><span className='fs-5'>Price Product: </span>{data.price}</h3>
        

      </div>
     </div>
    </div>
   <div className='products'>
    
 
   </div>
  </>)
}
