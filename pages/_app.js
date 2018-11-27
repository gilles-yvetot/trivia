import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'unistore/react'
import JssProvider from 'react-jss/lib/JssProvider';
import { getCookie } from '../util/cookies'
import Wrapper from '../components/Wrapper'
import store from '../store/store'
import getPageContext from '../src/getPageContext';
import { callApi } from '../util/apiCaller'


class MyApp extends App {

  pageContext = null;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ctx }) {

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    const token = getCookie('token', ctx.req && ctx.req.headers.cookie)
    return callApi('user/verify', 'post', { token, })
      .then(({ user, token }) => {
        return { pageProps, user, token }
      })
      .catch(() => {
        return { pageProps }
      })
  }

  render() {
    const { Component, pageProps, user, token } = this.props
    return (
      <Container>
        <Head>
          <title>Trivia</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Provider store={store}>
              <Wrapper retrievedUser={user} token={token}>
                <Component
                  pageContext={this.pageContext}
                  {...pageProps}
                />
              </Wrapper>
            </Provider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    )
  }
}

export default MyApp
