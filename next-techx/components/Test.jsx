import TypingAnimation from "./buttons/TypingAnimation";
import ProductCatalog from "./product/ProductCatalog";

function Test() {
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/2 px-6 pt-32">
          <div className="justify-start w-3/4 ml-6 flex-row flex flex-wrap ">
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
            <ProductCatalog
              image="https://img.jabko.ua/image/cache/home_cats/image%20154full.png.webp"
              title="Iphone"
            />
          </div>
        </div>

        <div className="w-1/2 relative  px-6 pt-14 lg:px-4 ">
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

          <div className="mx-auto max-w-2xl py-2 sm:py-48 lg:py-18">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-300 sm:text-6xl">
                <TypingAnimation />
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Dive into the world of Apple with our extensive selection of
                products. From the latest iPhone models and Apple Watches to
                MacBooks and iPads, find everything you need to stay connected,
                productive, and entertained. Experience technology that's
                designed to inspire.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Explore Now
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-600"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
