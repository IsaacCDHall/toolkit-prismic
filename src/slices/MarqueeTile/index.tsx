import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Heading from "@/app/components/Heading";
import React from "react";
import { CiFaceSmile } from "react-icons/ci";

/**
 * Props for `MarqueeTile`.
 */
export type MarqueeTileProps = SliceComponentProps<Content.MarqueeTileSlice>;

/**
 * Component for "MarqueeTile" Slices.
 */
const MarqueeTile = ({ slice }: MarqueeTileProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading size="lg" as="h2">
        {slice.primary.title}
      </Heading>
      {slice.items.map(({ color, name }, index) => (
        <div
          key={index}
          className="marquee-item mb-8 flex place-items-center gap-4 text-stone-700"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <React.Fragment key={index}>
              <span
                className="marquee-item text-8xl font-extrabold uppercase tracking-tighter"
                style={{ color: index === 3 && color ? color : "inherit" }}
              >
                {name}
              </span>
              <span className="text-3xl">
                {/* TODO add color to icon */}
                <CiFaceSmile />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default MarqueeTile;
