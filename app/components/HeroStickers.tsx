"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroStickers() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* CENTER MAIN TEXT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center max-w-6xl w-full px-4">
        {/* "ENTREPRENEUR DREAM BUILD SUCCEED" - top center */}
        <div className="mb-6 md:mb-8">
          <div className="text-xl md:text-2xl font-black tracking-widest text-gray-900 mb-2">
            ENTREPRENEUR
          </div>
          <div className="text-lg md:text-xl font-black tracking-widest text-gray-900">
            DREAM BUILD SUCCEED
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#a64d79] leading-tight mb-3">
          Empowering Young
        </h1>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#a64d79] leading-tight mb-8">
          Innovators & Entrepreneurs
        </h2>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-800 font-medium max-w-2xl mx-auto">
          an amazing group of talented people who work together to attain incredibly awesome results.
        </p>
      </div>

      {isLoaded && (
        <>
          {/* TOP LEFT: "THANKS CHATGPT I MADE IT" with brain - rotated left */}
          <div
            className="absolute top-8 left-4 md:left-12 md:top-20 z-20"
            style={{ transform: "rotate(-15deg)" }}
          >
            <Image
              src="/stickers/8.png"
              alt="Thanks ChatGPT"
              width={120}
              height={120}
              className="w-20 md:w-32 h-auto drop-shadow-xl"
            />
          </div>

          {/* LEFT SIDE: "THINK OUTSIDE THE BOX" with tic-tac-toe */}
          <div
            className="absolute left-2 md:left-4 top-1/3 z-20"
            style={{ transform: "rotate(8deg)" }}
          >
            <Image
              src="/stickers/9.png"
              alt="Think Outside The Box"
              width={110}
              height={130}
              className="w-20 md:w-28 h-auto drop-shadow-xl"
            />
          </div>

          {/* LEFT-CENTER: Light bulb / plant with text */}
          <div
            className="absolute left-6 md:left-16 bottom-32 md:bottom-40 z-20"
            style={{ transform: "rotate(-10deg)" }}
          >
            <Image
              src="/stickers/7.png"
              alt="Plant Sticker"
              width={100}
              height={100}
              className="w-16 md:w-24 h-auto drop-shadow-xl"
            />
          </div>

          {/* TOP CENTER-LEFT: Pink brain/professional overthinking */}
          <div
            className="absolute top-24 md:top-32 left-1/3 md:left-1/4 z-20"
            style={{ transform: "rotate(12deg)" }}
          >
            <Image
              src="/stickers/3.png"
              alt="Professional Brain"
              width={95}
              height={95}
              className="w-20 md:w-28 h-auto drop-shadow-xl"
            />
          </div>

          {/* TOP CENTER: "Aai tizz well" text area */}
          <div className="absolute top-32 md:top-40 left-1/2 transform -translate-x-1/2 z-20">
            <p className="text-xs md:text-sm font-italic text-gray-700 whitespace-nowrap italic">
              Aai tizz well
            </p>
          </div>

          {/* CENTER-LEFT: Microphone */}
          <div
            className="absolute left-1/3 md:left-2/5 top-1/2 md:top-1/3 z-20"
            style={{ transform: "rotate(-5deg)" }}
          >
            <Image
              src="/stickers/15.png"
              alt="Microphone"
              width={50}
              height={130}
              className="w-8 md:w-12 h-auto drop-shadow-xl"
            />
          </div>

          {/* CENTER-RIGHT: Small icon */}
          <div
            className="absolute right-1/3 md:right-2/5 top-1/3 md:top-1/4 z-20"
            style={{ transform: "rotate(-8deg)" }}
          >
            <Image
              src="/stickers/6.png"
              alt="Icon"
              width={60}
              height={60}
              className="w-10 md:w-14 h-auto drop-shadow-xl"
            />
          </div>

          {/* TOP RIGHT: "RECRUITER" badge */}
          <div
            className="absolute top-12 md:top-24 right-6 md:right-16 z-20"
            style={{ transform: "rotate(5deg)" }}
          >
            <Image
              src="/stickers/11.png"
              alt="Recruiter"
              width={100}
              height={85}
              className="w-20 md:w-32 h-auto drop-shadow-xl"
            />
          </div>

          {/* TOP RIGHT: "Aai tizz well" text box */}
          <div className="absolute top-32 md:top-40 right-12 md:right-24 z-20">
            <p className="text-xs md:text-sm font-italic text-gray-700">Aai tizz well</p>
          </div>

          {/* TOP RIGHT: "HELLO I'M COMPLICATED" badge */}
          <div
            className="absolute top-40 md:top-56 right-8 md:right-12 z-20"
            style={{ transform: "rotate(8deg)" }}
          >
            <Image
              src="/stickers/12.png"
              alt="Hello I'm Complicated"
              width={110}
              height={70}
              className="w-20 md:w-32 h-auto drop-shadow-xl"
            />
          </div>

          {/* RIGHT-CENTER: "YOU'RE HIRED" stamp */}
          <div
            className="absolute right-1/4 md:right-1/3 top-1/2 md:top-1/3 z-20"
            style={{ transform: "rotate(-20deg)" }}
          >
            <Image
              src="/stickers/4.png"
              alt="You're Hired"
              width={100}
              height={60}
              className="w-16 md:w-24 h-auto drop-shadow-xl"
            />
          </div>

          {/* CENTER BOTTOM: Arrow pointing down */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-32 md:bottom-40 z-20"
            style={{ transform: "translateX(-50%) rotate(0deg)" }}
          >
            <Image
              src="/stickers/18.png"
              alt="Arrow Down"
              width={60}
              height={100}
              className="w-10 md:w-14 h-auto drop-shadow-xl"
            />
          </div>

          {/* RIGHT SIDE: "FOUNDER" with icon */}
          <div
            className="absolute right-8 md:right-16 top-1/2 md:top-1/3 z-20"
            style={{ transform: "rotate(-12deg)" }}
          >
            <Image
              src="/stickers/2.png"
              alt="Founder"
              width={95}
              height={95}
              className="w-18 md:w-28 h-auto drop-shadow-xl"
            />
          </div>

          {/* RIGHT SIDE: "SELF MADE SELF PAID" large text */}
          <div
            className="absolute right-6 md:right-12 bottom-24 md:bottom-32 z-20"
            style={{ transform: "rotate(3deg)" }}
          >
            <Image
              src="/stickers/13.png"
              alt="Self Made Self Paid"
              width={130}
              height={130}
              className="w-24 md:w-40 h-auto drop-shadow-xl"
            />
          </div>

          {/* BOTTOM RIGHT: reCAPTCHA checkbox */}
          <div
            className="absolute bottom-12 md:bottom-20 right-4 md:right-8 z-20"
            style={{ transform: "rotate(0deg)" }}
          >
            <Image
              src="/stickers/22.png"
              alt="reCAPTCHA"
              width={160}
              height={82}
              className="w-28 md:w-44 h-auto drop-shadow-xl"
            />
          </div>

          {/* BOTTOM CENTER-LEFT: "NEVER FORGET WHY YOU STARTED" */}
          <div
            className="absolute bottom-20 md:bottom-28 left-1/3 md:left-2/5 z-20"
            style={{ transform: "rotate(-8deg)" }}
          >
            <Image
              src="/stickers/17.png"
              alt="Never Forget"
              width={80}
              height={80}
              className="w-14 md:w-20 h-auto drop-shadow-xl"
            />
          </div>

          {/* Additional small stickers for filler */}
          <div
            className="absolute top-1/4 right-1/4 md:right-1/3 z-20"
            style={{ transform: "rotate(15deg)" }}
          >
            <Image
              src="/stickers/20.png"
              alt="Filler"
              width={70}
              height={70}
              className="w-12 md:w-16 h-auto drop-shadow-xl"
            />
          </div>

          <div
            className="absolute bottom-32 md:bottom-40 right-1/4 z-20"
            style={{ transform: "rotate(-10deg)" }}
          >
            <Image
              src="/stickers/21.png"
              alt="Bottom Filler"
              width={60}
              height={60}
              className="w-10 md:w-14 h-auto drop-shadow-xl"
            />
          </div>
        </>
      )}
    </>
  );
}
