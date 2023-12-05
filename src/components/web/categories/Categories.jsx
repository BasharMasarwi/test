import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import './categories.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
export default function Categories() {
  const getCategories=async()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
    return data;
  }
  const {data,isLoading}=useQuery('webCategories',getCategories);
 
  if (isLoading){
    return<p>...Loading</p>
  }

  return (
    <div className="container">
      <div className='swiper-custom-pagination'></div>
 <Swiper
      modules={[Navigation, Pagination,Autoplay]}
      navigation
      loop={true}
      autoplay={{
        delay:1000
      }  }
        
      pagination={{ clickable: true,
      el:'.swiper-custom-pagination' }}
     
      spaceBetween={10}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data?.categories.length ? data?.categories.map((category)=>
       <SwiperSlide key={category._id}>  
       <Link to={`/products/category/${category._id}`}>
       <div className="category">
         <img src={category.image.secure_url} className="rounded-circle img"/>
          <h2 className='fs-5 '>{category.name}</h2>
       </div>
       </Link>
        </SwiperSlide>
      ):'<h2>np category found </h2>'}
    </Swiper>
       
      </div>
   
  )

}
