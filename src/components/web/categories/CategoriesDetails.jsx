import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import './categoriesDetails.css'
export default function CategoriesDetails() {
   const {categoryId} =useParams();
   const getCategoryDetails= async ()=>{
   const {data}= await axios.get (`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`);
   return data.products;
 }

   const {data , isLoading}=useQuery('categoty_details',getCategoryDetails);
    if(isLoading){
        return <p>...Loading</p>
    }
  return (
   <div className='products'>
    {data.length?data.map((product)=>
           <div className='product' key={product._id}>
            <img src={product.mainImage.secure_url} className='w ' />
            <h2 className='fs-5 pt-0'>{product.name}</h2>
            <Link to={`/product/${product._id}`} className='text-decoration-none ms-5 bg-info text-dark nam'>Details</Link>
           </div>
    ):<h2>product not found</h2>}
   </div>
  )
}
