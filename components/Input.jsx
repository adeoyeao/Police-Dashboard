import styles from "../styles/components/input.module.scss"

const Input = (props) => {
      return (
            <div className={styles.input}>
                  { props.icon }
            <input 
            name={props.name}
            type={props.name === "username" ? "text" : "password"} 
            value={props.input[props.name]} 
            onChange={(e) => props.handleChange(e)} 
            autoComplete="off" />
            </div>
      )
}

export default Input