import React from "react";

interface Props {
  cartItems: {
    id: number;
    player: {
      name: string;
    };
  };
  onClearHandler: () => void;
}

const Cart = ({ cartItems, onClearHandler }: Props) => {
  return (
    <>
      <div>Cart</div>
      <span>Cart Items: {cartItems.player?.name}</span>
      <button onClick={onClearHandler}>Change</button>
    </>
  );
};

export default Cart;
