import React from "react";

const About = () => {
  return (
    <section className="my-5  ">
      <div className="container">
        <div>
          <h3>About TechBlogger</h3>
          <span className="cs-divider"></span>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mb-3">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/NjwUHXoi8lM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.868463618581!2d91.7854906144322!3d22.471576742335497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd6fe9a3a4473%3A0x7836276aef538552!2sUniversity%20of%20Chittagong!5e0!3m2!1sen!2sbd!4v1670676670437!5m2!1sen!2sbd"
              width="600"
              title="map"
              height="450"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
