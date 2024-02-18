"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import { Content, KeyTextField } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import Shapes from "@/app/components/Shapes";
/**
 * Props for `GeoHero`.
 */
export type GeoHeroProps = SliceComponentProps<Content.GeoHeroSlice>;

/**
 * Component for "GeoHero" Slices.
 */
const GeoHero = ({ slice }: GeoHeroProps): JSX.Element => {
  const component = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1, 0.3)",
          duration: 1,
          transformOrigin: "left top",
          delay: 0.1,
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );
      tl.fromTo(
        ".geoHero-desc",
        {
          opacity: 0,
          y: 20,
          scale: 1.2,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scale: 1,
          ease: "elastic.out(1, 0.3)",
        }
      );
    }, component);
    return () => ctx.revert();
  });

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation=${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1" data-speed>
          {/* NOTE w-max added for text clipping on larger res */}
          <h1
            className="mb-8 text-[clamp(3rem,30vmin,15rem)] w-max font-extrabold leading-none tracking-tighter antialiased"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-stone-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-stone-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="geoHero-desc block bg-gradient-to-tr from-pink-500 via-stone-200 to-teal-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent md-text-4xl opacity-1">
            {slice.primary.desc}
          </span>
        </div>
      </div>
    </Bounded>
  );
};

export default GeoHero;
