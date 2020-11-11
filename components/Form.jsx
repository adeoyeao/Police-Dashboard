import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PolicyIcon from '@material-ui/icons/Policy';
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';
import Input from "./Input"
import LoginButton from "./LoginButton"

import { useRouter } from "next/router"
import { useState, useEffect } from "react"

import styles from "../styles/components/form.module.scss"

const Form = () => {
      const router = useRouter()

      const [input, setInput ] = useState({
            username: "",
            password: ""
      })

      const [login, setLogin] = useState(true)

      const handleSubmit = (e) => {
            e.preventDefault()
            fetch(`/${login ? "login" : "register"}`, {
                  method: "POST",
                  headers: {
                        "content-type": "application/json"
                  },
                  body: JSON.stringify({ username: input.username, password: input.password })
            })
            .then(res => res.json())
            .then(data => {
                  console.log(data.message)
                  setTimeout(() => router.push("/dashboard"), 500)
            })
            .catch(err => console.error(err))
      }

      const handleChange = (e) => {
            const { name, value } = e.target
            setInput( prev => ({
                  ...prev,
                  [name]: value
            }))
      }

      const oauth = (e, type) => {
            e.preventDefault()
            type !== "local" && router.push(`/auth/${type}`)
      }

      const register = () => setLogin(false)

      return (
            <div className={styles.form}>
                  <PolicyIcon style={{fontSize: "64px", color: "#008DD5"}}/>
                  <form onSubmit={handleSubmit}>
                        <Input 
                        icon={<PermIdentityIcon style={{color: "#DFBBB1"}}/>}
                        name="username"
                        input={input}
                        handleChange={handleChange}/>
                        <Input 
                        icon={<LockOpenIcon style={{color: "#DFBBB1"}}/>}
                        name="password"
                        input={input}
                        handleChange={handleChange}/>
                        <LoginButton 
                        type="local"
                        login={login}/>
                  </form>
      { login && <p onClick={register}>Not Registered? <span>Join Now</span></p> }
                  <LoginButton 
                  type="facebook"
                  handleClick={oauth}
                  icon={<FacebookIcon style={{color: "white"}}/> }/>
                  <LoginButton 
                  type="google"
                  handleClick={oauth}
                  icon={<GTranslateIcon style={{color: "white"}}/> }/>
            </div>
      )
}

export default Form