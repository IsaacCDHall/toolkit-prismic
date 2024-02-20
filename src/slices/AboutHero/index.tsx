"use client";
import { useRef } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";
import BodyImage from "@/app/components/BodyImage";

/**
 * Props for `AboutHero`.
 */
export type AboutHeroProps = SliceComponentProps<Content.AboutHeroSlice>;

/**
 * Component for "AboutHero" Slices.
 */
const AboutHero = ({ slice }: AboutHeroProps): JSX.Element => {
  const component = useRef<HTMLDivElement>(null);

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" className="col-start-1">
          {slice.primary.heading}
        </Heading>
        <div className="prose prose-xl prose-stone prose-invert col-start-1">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <Button
          linkfield={slice.primary.button_link}
          label={slice.primary.button_text}
        />
        <BodyImage
          image={slice.primary.image}
          className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>
    </Bounded>
  );
};

export default AboutHero;
