import App from "next/app"
import "../styles/settings/global.scss"
import store from "../redux/store"
import { Provider } from "react-redux"
import Head from "next/head"

const MyApp = ({ Component, pageProps }) => {
      return (
      <Provider store={store}>
            <Head>
                  <title>UK Police Data</title>
            </Head>
            <Component {...pageProps} />
      </Provider>
      )
}

export default MyApp