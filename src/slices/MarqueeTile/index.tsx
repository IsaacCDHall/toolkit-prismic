import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

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
      Placeholder component for marquee_tile (variation: {slice.variation})
      Slices
    </section>
  );
};

export default MarqueeTile;
