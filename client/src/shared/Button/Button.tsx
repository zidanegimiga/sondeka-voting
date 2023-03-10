import styles from "./Button.module.scss";

interface ButtonProps {
  text?: string;
  active?: boolean;
  variant?: string;
  action?: any;
  color: string;
  children?: React.ReactNode;
  icon?: boolean;
  type?: any;
}

const Button = ({ text, action, color, type }: ButtonProps) => {
  {
    if (type == "submit") {
      return (
        <button style={{ backgroundColor: color }} className={styles.button} type={type}>
          {text}
        </button>
      );
    } else {
      return (
        <div
          style={{ backgroundColor: color }}
          className={styles.button}
          onClick={action}
        >
          {text}
        </div>
      );
    }
  }
};

export default Button;
