import styles from "../styles/components/stat.module.scss"

const Stat = (props) => {
      return (
            <span>
                  <article className={styles.stat}>
                  </article>
                  <h3>{props.head}</h3>
            </span>

      )
}

export default Stat