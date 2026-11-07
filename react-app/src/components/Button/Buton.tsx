import styles from "./Button.module.css";

interface Props {
  clickHandler: () => void;
  name: string;
  color: string;
}

function Button({ clickHandler, name, color }: Props) {
  return (
    <button
      type="button"
      className={[styles.btn, styles["btn-" + color]].join(" ")}
      onClick={clickHandler}
    >
      {name || "Click me"}
    </button>
  );
}

export default Button;
