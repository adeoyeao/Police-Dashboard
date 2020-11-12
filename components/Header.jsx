import PolicyIcon from '@material-ui/icons/Policy';
import router from "next/router"
import styles from "../styles/components/header.module.scss"

const Header = () => {
      const handleClick = () => {
            router.push("/logout")
      }

      return (
            <header className={styles.header}>
                  <PolicyIcon style={{color: "#008DD5", fontSize: "48px"}}/>
                  <button onClick={handleClick}>Logout</button>
            </header>
      )
}

export default Header