import { TweenMax } from "gsap";
import React, { useEffect, useRef } from "react";
const About = () => {
  const elementRef = useRef(null);
  const elementRef2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;

      // Check if the element is in the viewport
      const isVisible = isInViewport(element);
      const screenWidth = window.innerWidth;
      const isVisible2 = isInViewport(elementRef2.current);

      // If the element is visible, animate it
      if (isVisible) {
        TweenMax.from(elementRef.current, 1, {
          x: -1000,
          ease: "Power3.easeOut",
          delay: 0.5,
        });
      }
      if (isVisible2) {
        TweenMax.from(elementRef2.current, 1, {
          left: screenWidth,
          opacity: 0,
          ease: "Power3.easeOut",
        });
      }
    };

    // Add event listener to the scroll event
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Helper function to check if element is in the viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };
  return (
    <section className="my-5  ">
      <div className="container">
        <div>
          <h3>About TechBlogger</h3>
          <span className="cs-divider"></span>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mb-3" ref={elementRef}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/NjwUHXoi8lM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="col-md-6" ref={elementRef2}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.868463618581!2d91.7854906144322!3d22.471576742335497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd6fe9a3a4473%3A0x7836276aef538552!2sUniversity%20of%20Chittagong!5e0!3m2!1sen!2sbd!4v1670676670437!5m2!1sen!2sbd"
              width="600"
              title="map"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
