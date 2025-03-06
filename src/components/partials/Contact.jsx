import React from 'react'
import HorizontalNav from './HorizontalNav'
import Footer from './Footer'

const Contact = () => {
  return (
<div className='h-full w-full bg-white pt-[7%]'>
    <HorizontalNav/>
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
                                    <h2 className="text-2xl font-bold mb-4">Drop Us a Line</h2>
                                    <form className="space-y-4 rounded shadow-xl p-8">
                                        <div>
                                            <input type="text" placeholder="Name *" className="w-full p-2 border border-gray-300 rounded"/>
                                        </div>
                                        <div>
                                            <input type="email" placeholder="Email *" className="w-full p-2 border border-gray-300 rounded"/>
                                        </div>
                                        <div>
                                            <textarea placeholder="Message *" className="w-full p-2 border border-gray-300 rounded h-32"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">GET FREE REPORT</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                    <Footer/>
</div>
  )
}

export default Contact