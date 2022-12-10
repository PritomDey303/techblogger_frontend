import React from "react";
import './Hero.css'
import { BiUser } from 'react-icons/bi';
import { SlCalender } from 'react-icons/sl';
import { FaRegComments } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="cs-hero d-flex align-items-center " 
    >
      <div className="container">
       <div className="row">
       <div className="col-md-6">
       <div className="">
        <h4 className="font-bold text-white d-inline-block bg-danger p-2 fs-6 rounded-2">Trending Post</h4>
        <h1 className=" mt-2 font-bold text-white fs-3">
        Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet
        </h1>
         <div className="d-flex justify-content-start gap-3 mt-4 mb-5">
            <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold"><BiUser/> Pritom</span>
            <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold"><FaRegComments/>  Comments : 10</span>
            <span className="bg-danger p-1 px-2 rounded-2 fs-6 text-white fw-semibold"><SlCalender/> 6 Nov 2022</span>
         </div>
         <Link to={`/blogs/11468ed61aee84de492a8b04158a22f0`} className='text-white py-2 text-decoration-none fw-semibold'>Read Post <FiChevronRight/></Link>
        </div>
       </div>
       </div>
      </div>
    </section>
  );
};

export default Hero;
