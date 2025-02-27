"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import ProductCards from "./product/ProductCards";
import { useState, useEffect } from "react";

// *************************************************************
//                      PRODUCT CAROUSEL.
//
// *************************************************************
//
export function ProductCarousel() {
  const [c_data, SetCData] = useState([]);
  const [carouselSlideWidth, SetCarouselSlideWidth] = useState(4);

  useEffect(() => {
    const ToGetData = async () => {
      try {
        const formatted_data = await fetch(
          "https://techx-server.tech:443/product/GettingDataForCarusel",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) 
          SetCData(await formatted_data.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }

    };
    
    ToGetData();
  }, []);

  useEffect(() => {
    const updateCarouselDisplay = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        SetCarouselSlideWidth(2); 
      } else if (screenWidth >= 640 && screenWidth < 768) {
        SetCarouselSlideWidth(3);
      } else if (screenWidth >= 768 && screenWidth < 1024) {
        SetCarouselSlideWidth(4); 
      } else {
        SetCarouselSlideWidth(4);
      }
    };

    updateCarouselDisplay();

    window.addEventListener("resize", updateCarouselDisplay);

    return () => window.removeEventListener("resize", updateCarouselDisplay);
  }, []);

  const iterations_array = Array.from(
    { length: Math.ceil(c_data.length / carouselSlideWidth) },
    (_, index) => index
  );
  
  return (
    <Carousel
      opts={{ align: "start" }}
      plugins={[
        Autoplay({
          delay: 10000,
        }),
      ]}
      orientation="horizontal"
      className="mx-20 max-w-full justify-center"
    >
      <CarouselContent className="-ml-1">
        { iterations_array.map((iteration) => (
          <CarouselItem key={iteration} className="flex flex-row justify-center p-2">
            {c_data.slice(iteration * carouselSlideWidth, (iteration + 1) * carouselSlideWidth).map((d, Index) => (
              <Link key={d.id} href={{pathname: "/product-detail", query: { id: `${d.id}` }, }}>
                <ProductCards key={Index} image={`https://techx-server.tech:443/product/GetImage/${d.images}`} title={d.model} color={d.color} price={d.price} descont_price={d.descont_price}/>
              </Link>
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
