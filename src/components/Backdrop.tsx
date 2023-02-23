import clsx from "clsx";
import React from "react";

type Props = {
  status: string;
  className: string;
  children: JSX.Element;
};

const Backdrop = ({ status, className, children }: Props) => {
  const backdrop =
    status === "preparing" && "filter blur-sm pointer-events-none";
  return <div className={clsx(className, backdrop)}>{children}</div>;
};

export default Backdrop;
