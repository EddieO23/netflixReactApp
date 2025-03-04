// import React, { use, useEffect, useRef, useState } from 'react';
// import logo from '../assets/Netflix-LOGO.png';
// import profilePic from '../assets/profile.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { Search, Bell, ChevronRight, X, Menu } from 'lucide-react';

// function Navbar() {
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isSticky, setIsSticky] =useState(false)

//   useEffect(() => {
// const handleScroll = () => {
//   setIsSticky(window.scroll > 0 )
// }
// window.addEventListener('scroll', handleScroll)

// return () => {
//   window.removeEventListener('scroll', handleScroll)
// }
//   }, [])

//   const mainInputRef = useRef(null);
//   const mobileInputRef = useRef(null);

//   const navigate = useNavigate()

//   const toggleSearch = (type) => {
//     if (type === 'mobile') {
//       mobileInputRef.current?.focus();
//     } else {
//       mainInputRef.current?.focus();
//     }
//     setIsSearchActive((prev) => !prev);
//   };

//   const handleSearch = (event) => {
//     if(event.key === "Enter" && searchQuery.trim()) {
//       setIsSearchActive(false)
//       isMenuOpen && setIsMenuOpen(false)
//       navigate(`/search/${encodeURIComponent(searchQuery)}`)
//       setSearchQuery("")
//     }
//     }

// const toggleMenu = () => {
//   setIsMenuOpen(prev => !prev)
// }

// const closeMenu = () => {
//   setIsMenuOpen(false)
// }

//   return (
//     <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col px-5 md:px-10 transition-all duration-300 ease-in-out text-white ${isSticky ? 'bg-black shadow-lg' : 'bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent'}`}>
//       <div className='flex items-center justify-between py-4'>
//         {/* logo */}
//         <div className='flex gap-x-6 md:gap-x-8 items-center'>
//           <Link to='/'>
//             <img src={logo} alt='netflix logo' className='w-28' />
//           </Link>
//           {/* navigation */}
//           <nav className='hidden text-sm lg:flex space-x-4'>
//             <Link to='/' className='hover:text-gray-300'>HOME</Link>
//             <Link to='/' className='hover:text-gray-300'>TV SHOWS</Link>
//             <Link to='/' className='hover:text-gray-300'>MOVIES</Link>
//             <Link to='/' className='hover:text-gray-300'>NEW & POPULAR</Link>
//             <Link to='/myList' className='hover:text-gray-300'>MY LIST</Link>
//             <Link to='/' className='hover:text-gray-300'>BROWSE BY LANGUAGE</Link>
//           </nav>
//         </div>

//         {/* icons and profile */}
//         <div className='flex items-center space-x-4'>

//           {/* search container */}

//           <div
//             className={`hidden md:flex relative items-center transition-all duration-300 ${
//               isSearchActive ? `w-72 p-2` : `w-auto`
//             }`}
//           >
//             <button
//               aria-label='toggle search btn'
//               onClick={(e) => {e.stopPropagation(), toggleSearch('desktop')}} // Pass 'desktop' for desktop view
//               className={`flex items-center justify-center p-2 ${
//                 isSearchActive ? `absolute left-0` : ``
//               }`}
//             >
//               {!isSearchActive && <Search size={20} color='white' />}
//             </button>
//             <input
//               ref={mainInputRef}
//               type='text'
//               placeholder='search'
//               aria-label='search'
//               onChange={(e) => {setSearchQuery(e.target.value)}}
//               onKeyDown={handleSearch()}
//               className={`absolute left-10 bg-black bg-opacity-75 text-white rounded-md border border-transparent focus:outline-none transition-all duration-300 ${
//                 isSearchActive
//                   ? `w-60 p-2 border-white opacity-100`
//                   : `w-0 p-0 opacity-0`
//               }`}
//             />
//           </div>

//           <Bell size={20} color='white' />
//           <img
//             src={profilePic}
//             alt='profile image'
//             className='w-8 h-8 rounded cursor-pointer'
//           />
//           <ChevronRight size={20} color='white' />

//           <button onClick={toggleMenu} className='lg:hidden ml-4 focus:outline-none' aria-label='hamburger menu'>
//             <Menu color='white' size={24} />
//           </button>

//         </div>
//       </div>

//       {/* mobile menu */}
//       <div
//         className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 p-8 flex flex-col gap-4 transition-transform duration-300 z-40 ${
//           isMenuOpen ? `translate-y-0` : `translate-y-full`
//         } lg:hidden`}
//       >
//         <button onClickCapture={closeMenu} className='self-end' onClick={() => setIsMenuOpen(false)}>
//           <X size={24} color='white' />
//         </button>

//         <nav className='flex flex-col space-y-2 mt-4'>
//           <div
//             className={`relative flex transition-all duration-300 ${
//               isSearchActive ? `` : `w-auto`
//             }`}
//           >
//             <button
//               aria-label='toggle search btn'
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleSearch('mobile'); // Pass 'mobile' for mobile view
//               }}
//               className={`flex items-center justify-center ${
//                 isSearchActive ? `absolute left-0` : ``
//               }`}
//             >
//               {!isSearchActive && <Search size={20} color='white' />}
//             </button>
//             <input
//               ref={mobileInputRef}
//               type='text'
//               placeholder='search'
//               aria-label='search'
//               onChange={(e) => {setSearchQuery(e.target.value)}}
//               onKeyDown={handleSearch()}
//               className={` bg-black bg-opacity-75 text-white rounded-md border border-transparent focus:outline-none transition-all duration-300 ${
//                 isSearchActive
//                   ? `w-60 p-2 border-white opacity-100`
//                   : `w-0 p-0 opacity-0`
//               }`}
//             />
//           </div>
//           <Link to='/' className='hover:text-gray-300'>HOME</Link>
//           <Link to='/' className='hover:text-gray-300'>TV SHOWS</Link>
//           <Link to='/' className='hover:text-gray-300'>MOVIES</Link>
//           <Link to='/' className='hover:text-gray-300'>NEW & POPULAR</Link>
//           <Link to='/myList' className='hover:text-gray-300'>MY LIST</Link>
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/Netflix-LOGO.png";
import profilePic from "../assets/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, ChevronRight, X, Menu } from "lucide-react";

function Navbar() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0); // Fixed to use window.scrollY
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mainInputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const navigate = useNavigate();

  const toggleSearch = (type) => {
    if (type === "mobile") {
      mobileInputRef.current?.focus();
    } else {
      mainInputRef.current?.focus();
    }
    setIsSearchActive((prev) => !prev);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchQuery.trim()) {
      setIsSearchActive(false);
      isMenuOpen && setIsMenuOpen(false);
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 flex flex-col px-5 text-white transition-all duration-300 ease-in-out md:px-10 ${isSticky ? "bg-black shadow-lg" : "bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-transparent"}`}
    >
      <div className="flex items-center justify-between py-4">
        {/* logo */}
        <div className="flex items-center gap-x-6 md:gap-x-8">
          <Link to="/">
            <img src={logo} alt="netflix logo" className="w-28" />
          </Link>
          {/* navigation */}
          <nav className="hidden space-x-4 text-sm lg:flex">
            <Link to="/" className="hover:text-gray-300">
              HOME
            </Link>
            <Link to="/" className="hover:text-gray-300">
              TV SHOWS
            </Link>
            <Link to="/" className="hover:text-gray-300">
              MOVIES
            </Link>
            <Link to="/" className="hover:text-gray-300">
              NEW & POPULAR
            </Link>
            <Link to="/myList" className="hover:text-gray-300">
              MY LIST
            </Link>
            <Link to="/" className="hover:text-gray-300">
              BROWSE BY LANGUAGE
            </Link>
          </nav>
        </div>

        {/* icons and profile */}
        <div className="flex items-center space-x-4">
          {/* search container */}
          <div
            className={`relative hidden items-center transition-all duration-300 md:flex ${
              isSearchActive ? `w-72 p-2` : `w-auto`
            }`}
          >
            <button
              aria-label="toggle search btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleSearch("desktop");
              }} // Pass 'desktop' for desktop view
              className={`flex items-center justify-center p-2 ${
                isSearchActive ? `absolute left-0` : ``
              }`}
            >
              {!isSearchActive && <Search size={20} color="white" />}
            </button>
            <input
              ref={mainInputRef}
              type="text"
              placeholder="search"
              aria-label="search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={handleSearch} // Fixed to pass the function reference
              className={`bg-opacity-75 absolute left-10 rounded-md border border-transparent bg-black text-white transition-all duration-300 focus:outline-none ${
                isSearchActive
                  ? `w-60 border-white p-2 opacity-100`
                  : `w-0 p-0 opacity-0`
              }`}
            />
          </div>

          <Bell size={20} color="white" />
          <img
            src={profilePic}
            alt="profile image"
            className="h-8 w-8 cursor-pointer rounded"
          />
          <ChevronRight size={20} color="white" />

          <button
            onClick={toggleMenu}
            className="ml-4 focus:outline-none lg:hidden"
            aria-label="hamburger menu"
          >
            <Menu color="white" size={24} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`bg-opacity-95 fixed top-0 left-0 z-40 flex h-full w-full flex-col gap-4 bg-black p-8 transition-transform duration-300 ${
          isMenuOpen ? `translate-y-0` : `translate-y-full`
        } lg:hidden`}
      >
        <button
          onClickCapture={closeMenu}
          className="self-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <X size={24} color="white" />
        </button>

        <nav className="mt-4 flex flex-col space-y-2">
          <div
            className={`relative flex transition-all duration-300 ${
              isSearchActive ? `` : `w-auto`
            }`}
          >
            <button
              aria-label="toggle search btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleSearch("mobile"); // Pass 'mobile' for mobile view
              }}
              className={`flex items-center justify-center ${
                isSearchActive ? `absolute left-0` : ``
              }`}
            >
              {!isSearchActive && <Search size={20} color="white" />}
            </button>
            <input
              ref={mobileInputRef}
              type="text"
              placeholder="search"
              aria-label="search"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onKeyDown={handleSearch} // Fixed to pass the function reference
              className={`bg-opacity-75 rounded-md border border-transparent bg-black text-white transition-all duration-300 focus:outline-none ${
                isSearchActive
                  ? `w-60 border-white p-2 opacity-100`
                  : `w-0 p-0 opacity-0`
              }`}
            />
          </div>
          <Link to="/" className="hover:text-gray-300">
            HOME
          </Link>
          <Link to="/" className="hover:text-gray-300">
            TV SHOWS
          </Link>
          <Link to="/" className="hover:text-gray-300">
            MOVIES
          </Link>
          <Link to="/" className="hover:text-gray-300">
            NEW & POPULAR
          </Link>
          <button
            onClick={() => {
              navigate("/mylist");
              setIsMenuOpen(false);
            }}
            className="hover:text-gray-300 text-left"
          >
            MY LIST
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
