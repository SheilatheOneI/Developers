import clsx from "clsx";
import { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export const H1 = ({ children, className }: TypographyProps) => (
  <h1
    className={clsx(
      "text-[1.5rem] xs:text-[1rem] md:text-[2.0rem] lg:text-[2.5rem]  2xl:text-[3.5rem] text-prmary-default font-semibold",
      className
    )}
  >
    {children}
  </h1>
);
export const H2 = ({ children, className }: TypographyProps) => (
  <h2
    className={clsx(
      "text-[1.5rem]  md:text-[1.5rem] lg:text-[1.75rem]  2xl:text-[2.5rem] text-prmary-default font-semibold",
      className
    )}
  >
    {children}
  </h2>
);

export const H3 = ({ children, className }: TypographyProps) => (
  <h3 className={clsx("text-lg md:text-xl lg:text-3xl", className)}>
    {children}
  </h3>
);

export const H5 = ({ children, className }: TypographyProps) => (
  <h5 className={clsx("text-lg md:text-xl lg:text-2xl", className)}>
    {children}
  </h5>
);

export const H6 = ({ children, className }: TypographyProps) => (
  <h5 className={clsx("text-lg lg:text-xl", className)}>{children}</h5>
);

export const Subtitle = ({ children, className }: TypographyProps) => (
  <p
    className={clsx("text-base md:text-lg lg:text-2xl text-grayish", className)}
  >
    {children}
  </p>
);

export const Subtitle2 = ({ children, className }: TypographyProps) => (
  <p className={clsx("text-sm md:text-base  text-grayish", className)}>
    {children}
  </p>
);

export const Paragraph = ({ children, className }: TypographyProps) => (
  <p className={clsx("", className)}>{children}</p>
);