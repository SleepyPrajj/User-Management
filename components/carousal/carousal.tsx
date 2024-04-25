/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';

// Define the props for each Carousel item

const Carousel: React.FC = () => {
  

  return (
    
  // <>
  //   {/* Section: Design Block */}
  //   <section className=" mt-28">
  //     {/* Navbar */}
        
  //     {/* Navbar */}
  //     {/* Jumbotron */}
  //     <div className="bg-transparent px-6 py-4  text-center md:px-12 lg:text-left">
  //       <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
  //         <div className="grid items-center gap-12 lg:grid-cols-2">
  //           <div className="mt-12 lg:mt-0">
  //             <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
  //           The best offer <br />
  //               <span className="text-success">for your business</span>
  //             </h1>
  //             <Link
  //               className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-xl rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2"
  //               data-te-ripple-init=""
  //               data-te-ripple-color="light"
  //               href="#!"
  //               role="button"
  //             >
  //           Get started
  //             </Link>
               
    //           </div>
    //           <div className="mb-12 lg:mb-0 ">
    //             <img
    //               src="https://tecdn.b-cdn.net/img/new/ecommerce/vertical/028.jpg"
    //               className="rounded-lg  max-h-fit "
    //               alt="img"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
    <section className='mt-32'>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl dark:text-white">
          Tenant Management System
          </h1>
          <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Add, Remove and Update tenant information.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
          Get started
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <a href="https://imgbb.com/">
            <img src="https://i.ibb.co/CnG7ndh/rent-tenant.png" alt="rent-tenant">
            </img>
          </a>
        </div>
      </div>
    </section>
  

  );
};

export default Carousel;
