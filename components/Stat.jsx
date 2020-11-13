import styles from "../styles/components/stat.module.scss"

const Stat = (props) => {
      return (
                  <article className={styles.stat}>
                        <h2>{props.stat}</h2>
                        <h3>{props.head}</h3>
                  </article>
      )
}

export default Stat