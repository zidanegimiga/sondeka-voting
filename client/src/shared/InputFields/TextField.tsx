import styles from './TextField.module.scss';

const TextField = ({value, onChange, type, name, placeholder}) => {
  return (
    <div>
        <input type={type} name={name} value={value} onChange={onChange} className={styles.textField} placeholder={placeholder}/>
    </div>
  )
}

export default TextField;