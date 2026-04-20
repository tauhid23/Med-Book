import React from 'react';
import image1 from '../../../../public/Images/expert_team_1.png'; // Dr. Sarah Mitchell (Left big image)
import image2 from '../../../../public/Images/expert_team_2.png'; // You can use this if needed, or import all 6 individually

// Better approach: Import all 7 images separately for clarity


const ExpertTeam: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 ">
      {/* Title */}
      <h2 className="text-4xl font-semibold text-[#00A3FF] mb-12 text-center md:text-left">
        Our Expert Team
      </h2>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left - Big CEO Card */}
        <div className="lg:w-1/3 flex-shrink-0">
          <div className="bg-gray-100 p-2 rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-5/5 relative">
              <img
                src={image1}
                alt="Dr. Sarah Mitchell"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">Dr. Sarah Mitchell</h3>
              <p className="text-gray-600 mt-1">CEO & Founder</p>
            </div>
          </div>
        </div>

        {/* Right - 2x3 Grid */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dr. Sophia Martinez */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md  overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Dr. Sophia Martinez"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Dr. Sophia Martinez</h3>
                <p className="text-sm text-gray-600">Chief Medical Officer</p>
              </div>
            </div>

            {/* Dr. Aisha Rahman */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Dr. Aisha Rahman"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Dr. Aisha Rahman</h3>
                <p className="text-sm text-gray-600">Senior Consultant</p>
              </div>
            </div>

            {/* Chloe Bennett */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Chloe Bennett"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Chloe Bennett</h3>
                <p className="text-sm text-gray-600">International Booking Coordinator</p>
              </div>
            </div>

            {/* Emily Parker */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Emily Parker"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Emily Parker</h3>
                <p className="text-sm text-gray-600">Patient Support Manager</p>
              </div>
            </div>

            {/* Ryan Carter */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Ryan Carter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Ryan Carter</h3>
                <p className="text-sm text-gray-600">Medical Travel Advisor</p>
              </div>
            </div>

            {/* Sofia Ibrahim */}
            <div className="text-center bg-gray-100 p-2 rounded-xl">
              <div className=" rounded-md overflow-hidden aspect-square">
                <img
                  src={image2}
                  alt="Sofia Ibrahim"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">Sofia Ibrahim</h3>
                <p className="text-sm text-gray-600">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertTeam;