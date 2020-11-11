import Form from "../components/Form"
import styles from "../styles/layouts/index.module.scss"
import { useState, useEffect } from "react"

const Index = () => {
      const [ viewHeight, setViewHeight ] = useState()

      const handleResize = () => setViewHeight(window.innerHeight)

      useEffect(() => {
            handleResize()
            window.addEventListener("resize", handleResize)
            return (() => window.removeEventListener("resize", handleResize))
      })

      const mainStyle = {
            minHeight: `${viewHeight}px`
      }

      return (
            <main className={styles.index} style={mainStyle}>
                  <Form />
            </main>
      )
}

export default Index