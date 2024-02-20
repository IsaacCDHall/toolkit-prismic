import { KeyTextField, LinkField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { clsx } from "clsx";
import { MdOutlineOpenInNew } from "react-icons/md";

type ButtonProps = {
  linkfield: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
};

export default function Button({
  linkfield,
  label,
  showIcon = true,
  className,
}: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkfield}
      //   remove overflow-hidden to see how animation works
      className={clsx(
        "group relative text-stone-800 flex w-fit place-items-center overflow-hidden rounded-md border-2 border-stone-900 bg-teal-400 px-4 py-2 font-bold transition-transform ease-out hover:scale-105",
        className
      )}
    >
      <span className="absolute inset-0 z-0 h-full translate-y-9 bg-gradient-to-tl from-pink-600 via-transparent to-indigo-900  transition-transform duration-300 ease-in-out group-hover:translate-y-0"></span>
      <span className="relative flex place-items-center gap-2">
        {label} {showIcon && <MdOutlineOpenInNew />}
      </span>
    </PrismicNextLink>
  );
}
