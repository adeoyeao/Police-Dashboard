import styles from "../styles/components/stat.module.scss"

const Stat = (props) => {
      return (
                  <article className={styles.stat}>
                        <h3>{props.head}</h3>
                  </article>
      )
}

export default Stat