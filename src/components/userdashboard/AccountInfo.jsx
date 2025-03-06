// import React, { useState } from 'react';
// import Navbar from '../partials/Navbar';
// import Sidebar from './sidebar';

// const AccountInfo = () => {
//   const [profilePicture, setProfilePicture] = useState(
//     "https://placehold.co/40x40"
//   ); // Default profile picture
//   const [fileInputVisible, setFileInputVisible] = useState(false);
//   const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile navbar visibility

//   const toggleMobileNav = () => {
//     setIsMobileNavOpen(!isMobileNavOpen); // Toggle mobile navbar visibility
//   };

//   const handleProfilePictureClick = () => {
//     setFileInputVisible(true);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//         setFileInputVisible(false);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div className="mx-auto h-screen">
//       <Navbar
//         profilePicture={profilePicture}
//         onProfilePictureClick={handleProfilePictureClick}
//         onFileChange={handleFileChange}
//         isMobileNavOpen={isMobileNavOpen}
//         toggleMobileNav={toggleMobileNav}
//       />
      
//       <div className="flex flex-col lg:flex-row h-screen items-start bg-gradient-to-t from-blue-300 to-white">
//         <Sidebar isOpen={isMobileNavOpen} toggle={toggleMobileNav} />

//         <section className="bg-white p-5 rounded-lg shadow-md mx-auto lg:ml-6 w-full lg:w-1/3 mt-6 lg:mt-[6%] lg:h-[85vh]">
//           <h1 className="text-2xl font-bold mb-6">Account Information</h1>
//           <div className="mb-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Account Details</h2>
//               <a href="#" className="text-orange-500">Edit</a>
//             </div>
//             <div className="p-2 border rounded-lg">
//               <div>
//                 <span className="block text-gray-500">Email</span>
//                 <span>jaiswalraaj217@gmail.com</span>
//               </div>
//             </div>
//           </div>
//           <div>
//             <div className="flex justify-between items-center mb-1">
//               <h2 className="text-xl font-semibold">User Details</h2>
//               <a href="#" className="text-orange-500">Edit</a>
//             </div>
//             <div className="p-2 border rounded-lg">
//               <div className="mb-4">
//                 <span className="block text-gray-500">Date of Birth</span>
//                 <span>01/01/1990</span>
//               </div>
//               <div className="mb-4">
//                 <span className="block text-gray-500">Gender</span>
//                 <span>Male</span>
//               </div>
//               <div className="mb-4">
//                 <span className="block text-gray-500">Address</span>
//                 <span>123 Street, City, Country</span>
//               </div>
//               <div>
//                 <span className="block text-gray-500">Membership</span>
//                 <span>Gold</span>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default AccountInfo;
