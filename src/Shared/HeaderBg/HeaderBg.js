import React from 'react';
import './HeaderBg.css'

const HeaderBg = ({content}) => {
    return (
        <div
        style={{ backgroundImage: `url(https://i.ibb.co/JrHrL3M/pexels-quang-nguyen-vinh-3232534.jpg)`}}
        className="header_bg d-flex align-items-center justify-content-center"
      >
        <h2 className="bg-danger px-4 py-1 text-white fs-3">
          {content}
        </h2>
      </div>
    );
};

export default HeaderBg;