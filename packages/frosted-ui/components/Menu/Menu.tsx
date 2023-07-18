import * as React from "react";

interface MenuProps {
  children?: React.ReactNode;
}

export const Menu = ({ children }: MenuProps) => {
  return (
    <>
      {children}
    </>
  );
};