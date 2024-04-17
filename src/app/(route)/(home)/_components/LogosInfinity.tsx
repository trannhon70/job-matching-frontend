"use client";
import logo1 from "@/assets/logos/englishwing-logo.jpg";
import logo2 from "@/assets/logos/job-matching-logo.svg";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import Image from "next/image";
import { useMemo } from "react";
import Slider from "react-slick";
import { useMediaQuery } from "usehooks-ts";

const logos = [logo1, logo2, logo1, logo2];

export const LogosInfinity = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const settings = useMemo(
    () => ({
      dots: false,
      infinite: true,
      speed: 4000,
      slidesToShow: isMobile ? 4 : 7,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: "linear",
      autoplaySpeed: 0,
      pauseOnHover: false,
    }),
    [isMobile],
  );

  return (
    <div className="container py-10">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index}>
            <Image src={logo} alt="logo" width={150} height={150} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index}>
            <Image src={logo} alt="logo" width={150} height={150} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div key={index}>
            <Image src={logo} alt="logo" width={150} height={150} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
