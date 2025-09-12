import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white underline decoration-red-600">About Chris Auto Shine</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-200 mb-8">
            With over 10 years of experience in the auto detailing industry, Chris Auto Shine is dedicated to providing top-quality car wash and detailing services. 
            Our team of certified professionals uses eco-friendly products and state-of-the-art equipment to ensure your vehicle receives the best care possible.
          </p>
          <p className="text-lg text-gray-200 mb-8">
            We believe in transparency, quality, and customer satisfaction. That's why we offer a satisfaction guarantee on all our services.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">10+</div>
              <p className="text-gray-300">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">1000+</div>
              <p className="text-gray-300">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">5★</div>
              <p className="text-gray-300">Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
