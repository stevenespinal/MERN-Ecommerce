import Head from "next/head";
import {Container} from "semantic-ui-react";

import Header from "./Header";
import React from "react";

function Layout({children, user}) {
  return (
    <>
      <Head>
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta charSet="utf-8"/>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest"/>
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#0041df"
          />
          <meta name="msapplication-TileColor" content="#00df94"/>
          <meta name="theme-color" content="#00df94"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta charSet="utf-8"/>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest"/>
          <link
            rel="mask-icon"
            href="/static/favicon/safari-pinned-tab.svg"
            color="#0041df"
          />
          <meta name="msapplication-TileColor" content="#00df94"/>
          <meta name="theme-color" content="#00df94"/>
        </>
        {/*<HeadContentData/>*/}
        {/* Stylesheets */}
        <link rel="stylesheet" type="text/css" href="/static/styles.css"/>
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css"/>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
        />
        <title>React-Ecommerce</title>
      </Head>
      <Header user={user}/>
      <Container text style={{paddingTop: "1em"}}>
        {children}
      </Container>
    </>
  );
}

export default Layout;
