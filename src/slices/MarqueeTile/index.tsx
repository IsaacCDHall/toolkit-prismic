"use client";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/app/components/Heading";
import React, { useEffect } from "react";
import { TbOctahedron } from "react-icons/tb";
import Bounded from "@/app/components/Bounded";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Props for `MarqueeTile`.
 */
export type MarqueeTileProps = SliceComponentProps<Content.MarqueeTileSlice>;

/**
 * Component for "MarqueeTile" Slices.
 */
const MarqueeTile = ({ slice }: MarqueeTileProps): JSX.Element => {
  const component = React.useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          // comment out for deploy
          // markers: true,
          pin: true,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,
          // trigger: component.current,
        },
      });
      tl.fromTo(
        ".marquee-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut",
        }
      );
    }, component);
    return () => ctx.revert();
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="wrapper overflow-hidden"
      ref={component}
    >
      <Bounded as="div">
        <Heading size="xl" as="h2">
          {slice.primary.title}
        </Heading>
      </Bounded>

      {slice.items.map(({ color, name }, index) => (
        <div
          key={index}
          className="marquee-row mb-8 flex place-items-center place-content-center gap-4 text-stone-700"
          aria-label={name || "Marquee Item"}
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <React.Fragment key={index}>
              <span
                className="marquee-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{ color: index === 19 && color ? color : "inherit" }}
              >
                {name}
              </span>
              <span className="text-3xl">
                {/* TODO add color to icon */}
                <TbOctahedron style={{ color: color || undefined }} />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default MarqueeTile;
