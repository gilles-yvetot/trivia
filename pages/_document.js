import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import PropTypes from 'prop-types';
import flush from 'styled-jsx/server';

// Used for MUI + html head tag + Style reset

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <link rel='icon' href='https://omniinc.com/favicon.ico' />
          <link href="https://fonts.googleapis.com/css?family=Oxygen:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossOrigin="anonymous" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={'user-scalable=0, initial-scale=1, ' + 'minimum-scale=1, width=device-width, height=device-height'}
          />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <style global jsx>
          {`
          body {
            margin: 0;
            height: 100vh;
          }

          #__next {
            height: 100vh;
            display: flex;
            flex-direction: column;
            alignItems: stretch;
          }

          #__next > main {
            flex: 1
          }
          ul {
            margin: 0;
            padding: 0
          }
          a {
            text-decoration: none;
          }
        `}
        </style>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  let pageContext;
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    WrappedComponent.propTypes = {
      pageContext: PropTypes.object.isRequired,// eslint-disable-line
    };

    return WrappedComponent;
  });

  return {
    ...page,
    pageContext,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
