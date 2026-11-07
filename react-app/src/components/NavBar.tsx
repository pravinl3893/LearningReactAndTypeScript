import React from "react";

interface Props {
  cartItemsCount: number;
}

const NavBar = ({ cartItemsCount }: Props) => {
  return <div> NavBar - Items in Cart: {cartItemsCount} </div>;
};

export default NavBar;
