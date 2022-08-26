import React from "react";
import DownloadAds from "./DownloadAds";

function Download() {
  return (
    <div className="flex flex-col items-center justify-start px-[5rem] bg-[#47B5FF] h-[48rem] pt-[18rem] mt-[-10rem] relative z-[0] rounded-b-[5rem]">
      {/* tild icon or path icon */}
      
      {/* heading */}
      <div className="headline mt-7 flex flex-col items-center text-[2rem]">
        <span >Best Ever User Experience</span>
        <span className="">
          <b>Awaits!</b>
        </span> <br/>

        <span className="text-[1rem] text-gray-400 px-[15rem] text-center mt-[1rem]">
          {/* Duis feugiat congue metus, ultrices vulputate nibh viverra eget.
          Vestibulum ullamcorper volutpat varius. */}
        </span>
      </div>
      <img src={require("./img/logo.png")} alt="" className="w-[5rem]" />
      <div className=" text-[#DFF6FF] text-[1.7rem]"> <b>Get it On</b></div>
{/* px
      dowload ads */}
      <div className="mt-14">
        <DownloadAds />
      </div>
    </div>
  );
}

export default Download;
