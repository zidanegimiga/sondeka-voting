import styles from './Button.module.scss';

const Button = ({text, action, color, type}) => {
  return (
    <button style={{"backgroundColor": color}} className={styles.button}>
      {text}        
    </button>
  )
}

export default Button;