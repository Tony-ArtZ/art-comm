import Image from "next/image";
import React from "react";

const CategoryCard = ({title, imageUrl}:{title:string, imageUrl:string}) => {
  return (
    <div className="relative w-40 overflow-hidden rounded-lg shadow-glow border-solid border-4 border-interactive aspect-[3/4] bg-black">
      <Image height={1500} width={1500} alt={title} src={imageUrl} className="object-cover transform scale-[2] opacity-100 w-full h-full filter blur-[5px]"/>
      <h1 className="absolute top-0 bottom-0 left-0 right-0 p-4 m-auto mx-4 text-5xl text-center bg-white rounded-lg bg-opacity-50 backdrop-blur-xl h-min font-Inter drop-shadow-glowHigh text-secondary">{title}</h1>
    </div>
  )
}

const Category = () => {

  return (
    <header className="w-screen 2xl:h-[870px] xl:h-[750px] sm:h-[600px] bg-categories bg-cover h-[400px] ">
      <h1 className="pt-8 pl-8 text-3xl font-extrabold text-heading font-Inter sm:text-4xl sm:pt-14 sm:pl-12 lg:text-5xl xl:text-6xl lg:pt-16 2xl:text-7xl 2xl:pt-20">
        BY CATEGORIES   
      </h1>
      <div className="mt-20">
        <CategoryCard title="3D" imageUrl="https://images.unsplash.com/photo-1661176920546-5b39bcd9fdba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"/>
      </div>
    </header>
  );
};

export default Category;
