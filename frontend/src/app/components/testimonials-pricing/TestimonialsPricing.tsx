"use client";

import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

const TestimonialsPricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const price = isYearly ? "$120/year" : "$12/month";
  const discount = isYearly ? "Save 50%" : "Save 25%";

  return (
    <div className="flex items-center justify-around gap-4 px-6 md:px-44 bg-feijoa-100 pb-4">
      {/* Testimonials Section */}
      <div className="flex flex-col w-1/2 h-44 bg-feijoa-200/50 backdrop-blur-md rounded-xl shadow-lg p-4 border border-feijoa-200">
        <h3 className="pb-2">Testimonials</h3>
        <div className="flex justify-between">
          <img
            src="/FinScopeAI-icon.png"
            alt="User 1"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div className="flex flex-col">
            <h6 className="text-feijoa-800 pl-1">
              This app helped me save more in 6 months than in 2 years without
              it. Highly recommend!
            </h6>
            <h5 className="font-semibold pl-1">Sarah W.</h5>
            <div className="flex">
              <StarIcon sx={{ fontSize: 25 }} className="text-yellow-500 " />
              <StarIcon sx={{ fontSize: 25 }} className="text-yellow-500 " />
              <StarIcon sx={{ fontSize: 25 }} className="text-yellow-500 " />
              <StarIcon sx={{ fontSize: 25 }} className="text-yellow-500 " />
              <StarIcon sx={{ fontSize: 25 }} className="text-yellow-500 " />
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-feijoa-200/50 w-1/2 h-44 backdrop-blur-md rounded-xl shadow-lg p-4 border border-feijoa-200">
        <h3 className="pb-2">Pricing</h3>

        {/* Toggle Switch */}
        <div className="flex justify-center">
          <div
            className="relative w-52  h-10 bg-feijoa-600/50 rounded-full flex items-center px-1 cursor-pointer shadow-inner mb-4"
            onClick={() => setIsYearly((prev) => !prev)}
          >
            {/* Sliding indicator */}
            <div
              className={`absolute w-24 h-8 bg-feijoa-800  rounded-full transition-transform duration-300 ease-in-out ${
                isYearly ? "translate-x-[110%]" : "translate-x-0"
              }`}
            />

            {/* Labels */}
            <div className="flex w-full justify-between px-4 z-1 text-sm font-medium text-white">
              <h6 className={isYearly ? "opacity-60" : "opacity-100"}>
                Monthly
              </h6>
              <h6 className={isYearly ? "opacity-100" : "opacity-60"}>
                Yearly
              </h6>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div className="flex justify-between items-center px-12">
          <h4
            className={`  text-xl font-semibold duration-400 ${
              isYearly ? "text-feijoa-800 scale-115" : "text-feijoa-800/70"
            }`}
          >
            {price}
          </h4>
          <h5
            className={` text-feijoa-50 px-4 py-1 rounded-full shadow-md duration-400 text-sm ${
              isYearly ? "bg-feijoa-800 scale-115" : "bg-feijoa-800/70"
            }`}
          >
            {discount}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPricing;
