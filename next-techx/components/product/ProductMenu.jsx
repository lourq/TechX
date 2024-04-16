"use client";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from "../ui/breadcrumb";

function ProductSelection() {
  // State for the filters
  const [memoryFilter, setMemoryFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [versionFilter, setVersionFilter] = useState([]);

  // Filter options
  const memoryOptions = ["256GB", "512GB", "1TB"];
  const colorOptions = [
    "Black Titanium",
    "Blue Titanium",
    "Natural Titanium",
    "White Titanium",
    "Blue",
    "Alpine Green",
    "Midnight",
    "Green",
    "Pink",
    "Deep Purple",
    "Starlight",
    "Gold",
    
  ];
  const versionOptions = ["Global", "e-Sim"];

  const [products, SetProducts] = useState([]);

  useEffect(() => {
    const ToGetData = async (type_p) => {
      SetProducts([]);

      try 
      {
        const formatted_data = await fetch(
          `http://localhost:3001/GetDataForListProduct/${type_p}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) 
          SetProducts(await formatted_data.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const product_type = params.get("type");

    if (product_type !== null) 
    {
      switch (product_type) 
      {
        case "Iphone":
          ToGetData("Iphone");
          break;
        case "AirPods":
          ToGetData("AirPods");
          break;
        case "AppleWatch":
          ToGetData("AppleWatch");
          break;
        case "Macbook":
          ToGetData("Macbook");
          break;
        case "Ipad":
          ToGetData("Ipad");
          break;
        case "Console":
          ToGetData("Console");
          break;
      }
    } else window.location.href = "/404";
  }, []);

  // Handlers for checkbox changes
  const handleCheckboxChange = (filterType, value) => {
    switch (filterType) {
      case "memory":
        setMemoryFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "color":
        setColorFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "version":
        setVersionFilter((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="pt-20 text-white font-sans  mb-4">
      <Breadcrumb className="px-10 py-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/">Iphone</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="container mx-auto  flex">
        <div className="flex flex-col w-2/3 h-full px-10 pr-4 bg-[#1d1d1d] p-4 rounded-lg ">
          {/* <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">
                Memory
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">

                  <div className="space-y-2 text-lg">
                    {memoryOptions.map((memory) => (
                      <label key={memory} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-gray-600"
                          onChange={() =>
                            handleCheckboxChange("memory", memory)
                          }
                          checked={memoryFilter.includes(memory)}
                        />
                        <span className="ml-2">{memory}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-bold">
                Color
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">

                  <div className="space-y-2 text-lg">
                    {colorOptions.map((color) => (
                      <label key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-gray-600"
                          onChange={() => handleCheckboxChange("color", color)}
                          checked={colorFilter.includes(color)}
                        />
                        <span className="ml-2">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-bold">
                Version
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-4">
                  <div className="space-y-2">
                    {versionOptions.map((version) => (
                      <label
                        key={version}
                        className="flex items-center text-lg"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-gray-600 "
                          onChange={() =>
                            handleCheckboxChange("version", version)
                          }
                          checked={versionFilter.includes(version)}
                        />
                        <span className="ml-2">{version}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion> */}

          <div className="flex flex-col m-4">
            <div className="mb-4">
              <h1 className="text-2xl font-bold p-2">Memory</h1>
              {/* <div className="mb-2">Объем памяти</div> */}
              <div className="space-y-2 text-base">
                {memoryOptions.map((memory) => (
                  <label key={memory} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-gray-600"
                      onChange={() => handleCheckboxChange("memory", memory)}
                      checked={memoryFilter.includes(memory)}
                    />
                    <span className="ml-2">{memory}</span>
                  </label>
                ))}
              </div>
            </div>
            <hr className="border-gray-600 my-4" />

            <div className="mb-4">
              <h1 className="text-2xl font-bold p-2">Color</h1>
              <div className="space-y-2 text-base text-nowrap">
                {colorOptions.map((color) => (
                  <label key={color} className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-gray-600"
                      onChange={() => handleCheckboxChange("color", color)}
                      checked={colorFilter.includes(color)}
                    />
                    <span className="ml-2">{color}</span>
                  </label>
                ))}
              </div>
            </div>
            <hr className="border-gray-600 my-4" />

            <div className="mb-4">
              <h1 className="text-2xl font-bold py-2">Version</h1>
              <div className="space-y-2">
                {versionOptions.map((version) => (
                  <label key={version} className="flex items-center text-base">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-gray-600 "
                      onChange={() => handleCheckboxChange("version", version)}
                      checked={versionFilter.includes(version)}
                    />
                    <span className="ml-2">{version}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 ml-10 gap-4 ">
          {products.map((product) => (
            <Link
              key={product.id}
              href={{
                pathname: "/product-detail",
                query: { id: `${product.id}` },
              }}
            >
              <div className="bg-[#1d1d1d] p-4 rounded-lg">
                <img
                  src={`http://localhost:3001/GetImage/${product.images}`}
                  alt={`${product.model}`}
                  className="mb-3"
                />
                <div className="font-bold">{product.model}</div>
                <div className="text-gray-300">
                  {" "}
                  {product.memory} ({product.color}){" "}
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="text-gray-400 line-through">
                    {product.price} $
                  </div>
                  <div className="text-red-500">{product.price} $</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSelection;
