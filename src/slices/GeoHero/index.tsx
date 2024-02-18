import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GeoHero`.
 */
export type GeoHeroProps = SliceComponentProps<Content.GeoHeroSlice>;

/**
 * Component for "GeoHero" Slices.
 */
const GeoHero = ({ slice }: GeoHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <div className="col-start-1 md:row-start-1">
          <h1
            className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter antialiased"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-stone-300">
              {slice.primary.first_name}
            </span>
            <span className="-mt-[.2em block text-stone-300">
              {slice.primary.last_name}
            </span>
            <>{slice.primary.desc}</>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default GeoHero;
