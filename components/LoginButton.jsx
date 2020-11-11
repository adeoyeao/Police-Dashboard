import styles from "../styles/components/loginbutton.module.scss"

const LoginButton = (props) => {
      return (
            <span className={styles.loginbutton}> {
            props.type !== "local" ?
            <button
            onClick={(e) => props.handleClick(e, props.type)}>
                  {props.icon} <p>{props.type}</p>
            </button> :
            <button>
                  { props.login ? "Login" : "Register" }
            </button>
            } </span>
      )
}

export default LoginButton