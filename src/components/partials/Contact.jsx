import React from 'react';
import HorizontalNav from './HorizontalNav';
import Footer from './Footer';

const Contact = () => {
  return (
    <div className="h-full w-full bg-white pt-[7%]">
      <HorizontalNav />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-4">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-gray-700 mb-4">
                Nixies India Technologies is a leading provider of mobile, web, and AI/ML applications, delivering innovative solutions to businesses around the globe. Contact us today to discover how we can elevate your digital presence.
              </p>
              <div className="mb-4">
                <p className="text-gray-700 font-medium"><i className="fas fa-map-marker-alt mr-2"></i>Visit Us :</p>
                <p className="text-gray-600">301 Lakeview Appartment, Shapura, Near Bansal Hospital, Bhopal, MP</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-medium"><i className="fas fa-envelope mr-2"></i>Mail Us :</p>
                <p className="text-gray-600">info@nixiesindia.com</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-medium"><i className="fas fa-phone mr-2"></i>Phone Us :</p>
                <p className="text-gray-600">+91 0755-4928542</p>
              </div>
            </div>

            <div className="md:w-1/2 pl-4">
              <h2 className="text-2xl font-bold mb-4">Our Location</h2>
              <div className="rounded shadow-xl overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.1994057882753!2d77.4166911085966!3d23.199402509623123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c435a471fbbb3%3A0x51200379da198ba5!2snixies%20India%20Technologies%20LLP!5e0!3m2!1sen!2sin!4v1742204783368!5m2!1sen!2sin" width="550" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
