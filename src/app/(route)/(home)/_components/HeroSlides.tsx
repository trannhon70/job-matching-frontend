"use client";

import banner1 from "@/assets/backgrounds/banner1.jpg";
import banner2 from "@/assets/backgrounds/banner2.jpg";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const HeroSlides = () => {
  return (
    <section className="py-4">
      <Carousel
        autoPlay
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        className="container"
      >
        <div className="relative aspect-[2]">
          <Image src={banner1} alt="slide" fill priority />
        </div>
        <div className="relative aspect-[2]">
          <Image src={banner2} alt="slide" fill priority />
        </div>
      </Carousel>
    </section>
  );
};
