import Image from "next/image";
import {NextRouter} from "next/router";
import React from "react";

const CategoryCard = ({handleCardClick, title, imageUrl, categoryId}:{handleCardClick:(categoryId:string)=>void, title:string, imageUrl:string, categoryId:string}) => {
  return (
    <div onClick={()=>handleCardClick(categoryId)} className="relative w-40 overflow-hidden rounded-lg shadow-glow border-solid border-4 border-interactive aspect-[3/4] bg-black">
      <Image height={1500} width={1500} alt={title} src={imageUrl} className="object-cover transform scale-[2] opacity-100 w-full h-full filter blur-[5px]"/>
      <h1 className="absolute top-0 bottom-0 left-0 right-0 p-4 m-auto mx-4 text-5xl text-center bg-white rounded-lg bg-opacity-50 backdrop-blur-xl h-min font-Inter drop-shadow-glowHigh text-secondary">{title}</h1>
    </div>
  )
}

const Category = ({router}:{router:NextRouter}) => {
  const handleCardClick = (categoryId:string) => {
    router.push(`/search/?categories=${categoryId}`)
  }
  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-categories bg-cover h-[400px] ">
      <h1 className="pt-8 pl-8 text-3xl font-extrabold text-heading font-Inter sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
        BY CATEGORIES   
      </h1>
      <div className="flex mt-20 gap-2">
        <CategoryCard handleCardClick={handleCardClick} title="3D" imageUrl="https://images.unsplash.com/photo-1661176920546-5b39bcd9fdba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" categoryId="3D"/>
        <CategoryCard handleCardClick={handleCardClick} title="2D" imageUrl="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2545&q=80" categoryId="2D"/>
      </div>
    </header>
  );
};

export default Category;
