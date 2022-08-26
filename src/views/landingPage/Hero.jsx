import { React, useState } from "react";
import DownloadAds from "./DownloadAds";
import VisibilitySensor from "react-visibility-sensor";
import { motion } from "framer-motion";
import email from "./email";

function Hero() {
  const [elementIsVisible, setElementIsVisible] = useState(false);
  const bg = {
    true: {
      left: "7rem",
    },
    false: {
      left: "19rem",
    },
  };
  const musicPlayer = {
    true: {
      left: "295px",
    },
    false: {
      left: "235px",
    },
  };
  const rect = {
    true: {
      left: "11rem",
    },
    false: {
      left: "13rem",
    },
  }
  const heart = {
    true: {
      left: "9rem",
    },
    false: {
      left: "12.5rem",
    },
  };
  return (
    <VisibilitySensor
      onChange={(isVisible) => setElementIsVisible(isVisible)}
      minTopValue={300}
    >
      <div className="wrapper bg-[#DFF6FF] flex items-center justify-between px-[5rem] rounded-b-[5rem] w-[100%] h-[35rem] relative z-[3] text-[#1363DF]">
        {/* left side */}
        <div className="headings flex flex-col items-start justify-center h-[100%] text-[3rem]">
          <span ><b>Vaidya Setu</b> </span>{" "}
          <span className="text-[#80cc28] ">
           Secure your Medical Records
          </span>
          <span className="text-[15px] text-[#06283D]">
            
            <br />

          <b>Powered By BlockChain Technology </b>  
          <br /> <br/>
          </span>
          {/* download ads */}
          <div>
            <span className="text-[33px] text-[#06283D]">Getting Started</span>
            {/* <DownloadAds /> */}
            
          </div>
          <div  className="text-[29px]"><input type="email" classname="text-[15px] text-[#80cc28] w-[1rem]" placeholder="Please Enter Your Email" required></input>
             </div>
             <div><button type="submit" className="text-[20px] text-[#F6F6F6] buttons flex rounded-[8px] border:bg-[#F6F6F6] hover:bg-[#00D7FF] bg-[#0078AA]"> Sign Up</button></div>
        </div>
        {/* right side */}
        <div className="images relative w-[50%]">
          <motion.img
            variants={bg}
            animate={`${elementIsVisible}`}
            transition={{ duration: 1, type: "ease-out" }}
            src={require("./img/back.png")}
            alt=""
            className="absolute top-[-8rem] right-[2rem] w-[15rem]"
          />
          <img
            src={require("./img/p 1.png")}
            alt=""
            className="absolute top-[-10rem] h-[25rem] left-[15rem]"
          />
          {/* <motion.img
            variants={musicPlayer}
            animate={`${elementIsVisible}`}
            transition={{
              duration: 1,
              type: "ease-out",
            }}
            src={require("../img/p 2.png")}
            alt=""
            className="absolute right-[155px] top-[20px] w-[55px]"
          /> */}
          {/* <motion.img
            variants={rect}
            animate={`${elementIsVisible}`}
            transition={{
              type: "ease-out",
              duration: 1,
            }}
            src={require("../img/p 3.png")}
            alt=""
            className="absolute w-[8rem] right-[20rem] top-[10rem]"
          /> */}
          {/* <motion.img
            variants={heart}
            animate={`${elementIsVisible}`}
            transition={{
              type: "ease-out",
              duration: 1,
            }}
            src={require("../img/p 4.png")}
            alt=""
            className="absolute w-[5rem] left-[20rem] top-[12rem]"
          /> */}
        </div>
      </div>
    </VisibilitySensor>
  );
}

export default Hero;
