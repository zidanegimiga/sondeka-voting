import styles from "./TextField.module.scss";

const TextField = ({ value, onChange, type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.textField}
      placeholder={placeholder}
    />
  );
};

export default TextField;
