import React, { ReactNode } from "react";

interface Props {
  text: ReactNode;
  onClose: () => void;
}

const Alert = ({ text, onClose }: Props) => {
  return (
    <div className="alert theme-warning" role="alert">
      <p>{text}</p>
      <button
        type="button"
        className="btn-close ms-auto"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose}
      ></button>
    </div>
  );
};

export default Alert;
