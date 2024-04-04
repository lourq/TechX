"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { PullOutOfSession } from "@/lib/session";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(
    "https://img.jabko.ua/image/cache/catalog/products/2022/09/072253/photo_2022-09-07_22-53-30-1397x1397.jpg.webp"
  );
  let [capacity, setCapacity] = useState("128");
  const [show_logged_content, SetShowLoggedContent] = useState(false);
  const [product_data, SetProductData] = useState();
  const [all_reviews, SetAllReviews] = useState([]);
  const [user_name, SetUserName] = useState("");
  const [user_review, SetUserReview] = useState("");
  const [grade, SetGrade] = useState(1);

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      const targetId = event.target.getAttribute("href").slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement)
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
    };

    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    return () => {
      scrollLinks.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
    };
  }, []);

  // Пример анимации элемента с использованием Framer Motion
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const ToGetData = async (id) => {
      try {
        const formatted_data = await fetch(
          `http://localhost:3001/ExtractIphoneData/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (formatted_data.ok) {
          const data = await formatted_data.json();

          SetProductData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const GetProductReviews = async () => {
      try {
        const id_product = new URLSearchParams(window.location.search).get(
          "id"
        );

        const rew = await fetch(
          `http://localhost:3001/GetProductReview/${id_product}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await rew.json();

        if (rew.ok) SetAllReviews(data);
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      }
    };

    const params = new URLSearchParams(window.location.search);

    if (localStorage.getItem("token") !== null) SetShowLoggedContent(true);

    ToGetData(params.get("id"));
    GetProductReviews();
  }, [window.location.search]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleRatingChange = (event) => {
    SetGrade(Number(event.target.value));
  };

  const handleSendReview = async (e) => {
    e.preventDefault();

    if (!show_logged_content) {
      if (!user_name.trim() || !user_review.trim()) {
        //    выведете тут сообщение о том что имя или поля не должны быть пустыми.
        return;
      }

      const product_id = new URLSearchParams(window.location.search).get("id");

      const ServerReview = await fetch(
        "http://localhost:3001/SendProductReview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id,
            review_owner_id: null,
            user_name,
            user_review,
            grade,
          }),
        }
      );

      const answer = await ServerReview.json();

      if (answer) {
        ///   < выведите модальное окно о том что отзыв отправлен.
        SetUserName("");
        SetUserReview("");
        SetGrade(0);
      } else {
        ///   < выведите сообщение о том что произошла хуйня и отзыв не отправлен.
      }
    } else {
      console.log("пользователь под аккаунтом");

      if (!user_review.trim()) {
        //    выведете тут сообщение о том что имя или поля не должны быть пустыми.
        return;
      }

      const l_user_data = await PullOutOfSession();

      const product_id = new URLSearchParams(window.location.search).get("id");

      const ServerReview = await fetch(
        "http://localhost:3001/SendProductReview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id,
            review_owner_id: l_user_data.email,
            user_name: null,
            user_review,
            grade,
          }),
        }
      );

      const answer = await ServerReview.json();

      if (answer) {
        ///   < выведите модальное окно о том что отзыв отправлен.
        SetUserName("");
        SetUserReview("");
        SetGrade(0);
      } else {
        ///   < выведите сообщение о том что произошла хуйня и отзыв не отправлен.
      }
    }
  };

  return (
    <main>
      <section className="py-20 font-poppins  mt-5 ">
        {/* <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
              <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",}}/>
            </div> */}
        <div className=" flex flex-row px-6 py-4 gap-6 mb-1 font-bold ml-10">
          <a className="hover:text-gray-400 cursor-pointer " href="#details">
            Details
          </a>
          <a className="hover:text-gray-400 cursor-pointer ">Characteristics</a>
          <a className="hover:text-gray-400 cursor-pointer" href="#reviews">
            Reviews({all_reviews.length})
          </a>
        </div>
        <div className="max-w-5xl px-4 mx-auto">
          <div className="flex flex-wrap mb-24 -mx-4">
            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative mb-6 lg:mb-10 ">
                  <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2 "
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                      viewBox="0 0 16 16"
                    ></svg>
                  </a>
                  <img
                    className="object-cover w-full max-sm:w-auto lg:h-1/2"
                    src={
                      `http://localhost:3001/GetImage/${product_data?.images[0]}` ||
                      "Loading..."
                    }
                    alt=""
                  />
                  <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                      viewBox="0 0 16 16"
                    ></svg>
                  </a>
                </div>
                <div className="flex-wrap hidden -mx-2 md:flex">
                  {product_data?.images.map((image, index) => (
                    <div key={index} className="w-1/2 p-2 sm:w-1/4">
                      <a
                        className="block border border-transparent hover:border-blue-400"
                        href="#"
                        onClick={() => handleImageClick(image)}
                      >
                        <img
                          className="object-cover w-full lg:h-32"
                          src={`http://localhost:3001/GetImage/${image}`}
                          alt={`Product Image ${index + 1}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
                {/* <div className="px-6 pb-6 mt-6 border-t border-gray-300 dark:border-gray-400 ">
                  <div className="flex items-center justify-center mt-6">
                    <span className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-5 h-5 text-blue-700 dark:text-gray-400 bi bi-chat-left-dots-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793V2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                      </svg>
                    </span>
                    <div>
                      <h2 className="text-sm font-bold text-gray-700 lg:text-lg dark:text-gray-400">
                        Have question?
                      </h2>
                      <a
                        className="text-xs text-blue-400 lg:text-sm dark:text-blue-200"
                        href="#"
                      >
                        Chat with...
                      </a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-6 ">
                  <span className="text-red-500  animate-pulse">New</span>
                  <h2 className="max-w-xl mt-2 mb-4 text-5xl font-bold md:text-6xl font-heading dark:text-gray-300">
                    {product_data?.model || "Loading..."}
                  </h2>
                  <p className="max-w-md mb-4 text-gray-500 dark:text-gray-400">
                    Get $100-$500 off when you trade in an one plus 6 or newer.
                  </p>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline dark:text-gray-400"
                  >
                    See how trade-in works
                  </a>
                </div>
                <div className="">
                  <p className="mb-4 text-lg font-semibold dark:text-gray-400">
                    Choose your finish
                  </p>
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-gray-300 lg:grid-cols-3 dark:border-gray-600">
                    <div>
                      <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-500 hover:border-blue-400">
                        <div>
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-emerald-400"></div>
                          <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                            {product_data?.color || "Loading..."}
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-500 hover:border-blue-400">
                        <div>
                          <div className="w-8 h-8 mx-auto mb-2 bg-gray-700 rounded-full dark:bg-gray-600"></div>
                          <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                            Mattee Black
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-500 hover:border-blue-400">
                        <div>
                          <div className="w-8 h-8 mx-auto mb-2 bg-red-500 rounded-full"></div>
                          <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                            Red
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-500 hover:border-blue-400">
                        <div>
                          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-stone-200"></div>
                          <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                            Silver
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center justify-center w-full h-full py-4 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-500 hover:border-blue-400">
                        <div>
                          <div className="w-8 h-8 mx-auto mb-2 bg-blue-200 rounded-full"></div>
                          <p className="text-xs text-center text-gray-700 dark:text-gray-400">
                            Sierra Blue
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="mb-2 text-lg font-semibold dark:text-gray-400">
                    Choose your Capacity
                  </p>
                  <a
                    href="#"
                    className="text-blue-500 hover:underline dark:text-gray-400"
                  >
                    How much capacity is right for you?
                  </a>
                  <RadioGroup value={capacity} onChange={setCapacity}>
                    <div className="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 lg:grid-cols-3 dark:border-gray-600">
                      {/*{product_data?.memory || "Loading..."}*/}
                      {["128", "256", "512", "1"].map((size) => (
                        <div key={size}>
                          <button
                            className={`flex items-center justify-center w-full h-full py-4 border-2 ${
                              capacity === size
                                ? "border-blue-400"
                                : "border-gray-300"
                            } dark:border-gray-600 hover:border-blue-400`}
                            onClick={() => setCapacity(size)}
                          >
                            <div>
                              <div className="mb-2 font-semibold dark:text-gray-400">
                                {size} GB
                              </div>
                              <p className="px-2 text-xs font-medium text-center text-gray-700 dark:text-gray-400">
                                From $99 or $41.62/mo. for 24 mo.
                              </p>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-6">
                  <p className="mb-4 text-lg font-semibold dark:text-gray-400">
                    Choose a payment option
                  </p>
                  <div className="grid grid-cols-2 gap-4 pb-4 mt-2 mb-4 border-b-2 border-gray-300 lg:grid-cols-3 dark:border-gray-600">
                    <div>
                      <button className="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-600 hover:border-blue-400">
                        <div>
                          <p className="px-2 text-base font-semibold text-center text-gray-700 dark:text-gray-400">
                            Pay in full
                          </p>
                        </div>
                      </button>
                    </div>
                    <div>
                      <button className="flex items-center justify-center w-full h-full px-2 py-6 border-2 border-gray-300 dark:hover:border-blue-400 dark:border-gray-600 hover:border-blue-400">
                        <div>
                          <p className="px-2 text-base font-semibold text-center text-gray-700 dark:text-gray-400">
                            Pay monthly
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 ">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-truck"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                      Delivery
                    </h2>
                  </div>
                  <div className="px-7">
                    <p className="mb-2 text-sm dark:text-gray-400">In Stock</p>
                    <p className="mb-2 text-sm dark:text-gray-400">
                      Free Shipping
                    </p>
                    <a
                      className="mb-2 text-sm text-blue-400 dark:text-blue-200"
                      href="#"
                    >
                      Get delivery dates
                    </a>
                  </div>
                </div>
                <div className="mt-6 ">
                  <div className="flex flex-wrap items-center">
                    <span className="mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-700 dark:text-gray-400 bi bi-bag"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"></path>
                      </svg>
                    </span>
                    <h2 className="text-lg font-bold text-gray-700 dark:text-gray-400">
                      Pickup
                    </h2>
                  </div>
                  <div className="px-7">
                    <a
                      className="mb-2 text-sm text-blue-400 dark:text-blue-200"
                      href="#"
                    >
                      Check availability
                    </a>
                  </div>
                </div>
                <div className="mt-6 ">
                  <button className="w-full px-4 py-2 font-bold text-white bg-black border lg:w-96 hover:bg-blue-800">
                    Continue
                  </button>
                </div>
                <div className="flex items-center mt-6 ">
                  <div>
                    <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                      Still deciding?
                    </h2>
                    <p className="mb-2 text-sm dark:text-gray-400">
                      {" "}
                      Add this item to a list and easily come back to it later{" "}
                    </p>
                  </div>
                  <span className="ml-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-6 h-6 text-blue-500 cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 bi bi-bookmark dark:text-gray-400"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="">
        <motion.div
          id="details"
          className="mt-24"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        />
        <div className="mx-20 rounded-lg ">
          <div className="bg-black rounded-lg">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Основные характеристики
              </h2>

              <ul className="mt-6 space-y-6 ">
                <li className="bg-[#1d1d1d] rounded-lg shadow-sm p-6 flex items-center">
                  <svg
                    className="h-5 w-5 mr-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2-2 2-4-4"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">Бренд</h3>
                    <p className="mt-2 text-base text-gray-300">Apple</p>
                  </div>
                </li>
                <li className="bg-[#1d1d1d] rounded-lg shadow-sm p-6 flex items-center">
                  <svg
                    className="h-5 w-5 mr-4 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">Модель</h3>
                    <p className="mt-2 text-base text-gray-300">
                      {product_data?.model}
                    </p>
                  </div>
                </li>
                <li className="bg-[#1d1d1d] rounded-lg shadow-sm p-6 flex items-center">
                  <svg
                    className="h-5 w-5 mr-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4zm0 14V18m0 2a2 2 0 1 0 0 4a2 2 0 0 0 0-4z"
                    />
                  </svg>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white">Гарантия</h3>
                    <p className="mt-2 text-base text-gray-300">
                      Официальная гарантия от производителя 12 месяцев. Гарантия
                      Yabko 31 день с возможностью продления.
                    </p>
                  </div>
                </li>
                {/* <li className="bg-[#1d1d1d] rounded-lg shadow-sm p-6 flex items-center">
                  <svg className="h-5 w-5 mr-4 text-indigo" />
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/*Reviews section.*/}
      <section>
        <motion.div
          id="reviews"
          className="mt-24"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
        />
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Write Review
          </h2>
          <form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {!show_logged_content ? (
              <input
                type="text"
                placeholder="Name"
                className="block w-full px-4 py-3 rounded-lg shadow-sm  sm:text-sm bg-[#1d1d1d]"
                value={user_name}
                onChange={(e) => SetUserName(e.target.value)}
              />
            ) : null}
            <div className="px-4 py-3">
              {" "}
              Grade{" "}
              <span className="flex flex-row">
                <>
                  <style>
                    {`
                    .rating {
                      display: inline-block;
                      opacity: 1;
                    }
                    
                    .rating input {
                      display: none;
                      opacity: 1;
                    }
                    
                    .rating label {
                      float: right;
                      cursor: pointer;
                      color: #ccc;
                      transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
                    }
                    
                    .rating label:before {
                      content: '\\2605';
                      font-size: 30px;
                      transition: color 0.3s;
                    }
                    
                    .rating input:checked ~ label,
                    .rating label:hover,
                    .rating label:hover ~ label {
                      color: #ffc300;
                      transform: scale(1.2);
                      transition: color 0.3s, transform 0.3s, box-shadow 0.3s;
                      animation: bounce 0.5s ease-in-out alternate;
                    }
                    
                    @keyframes bounce {
                      to {
                        transform: scale(1.3);
                      }
                    }
                  `}
                  </style>
                  <div className="rating">
                    {[5, 4, 3, 2, 1].map((value) => (
                      <React.Fragment key={value}>
                        <input
                          type="radio"
                          id={`star${value}`}
                          name="reviewRating"
                          value={value}
                          checked={grade === value}
                          onChange={handleRatingChange}
                        />
                        <label htmlFor={`star${value}`}></label>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              </span>
            </div>
            <input
              type="text"
              placeholder="Review"
              className="block w-full px-4 py-3 rounded-lg shadow-sm  sm:text-sm bg-[#1d1d1d]"
              value={user_review}
              onChange={(e) => SetUserReview(e.target.value)}
            />
            <button
              className="border border-white w-24 rounded-lg hover:bg-gray-950"
              onClick={(e) => handleSendReview(e)}
            >
              Send
            </button>
          </form>
        </div>
        {all_reviews.length > 0
          ? all_reviews.map((review, index) => (
              <div className="bg-[#1d1d1d] rounded-lg shadow-sm items-center max-w-7xl mx-auto py-5 px-4 sm:px-6 lg:px-8">
                <h1 className="text-lg font-bold">
                  {review.review_owner_name}
                </h1>
                <div className="flex py-2">
                  {[...Array(review.grade)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <hr className="my-4 border-gray-300" />
                <div>
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : null}
      </section>
    </main>
  );
};

export default ProductDetails;
