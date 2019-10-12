import App from "next/app";
import Layout from "../components/_App/Layout";
// _app gives us access to every single page
// useful for authenticating users
//can pass down data to every single page
class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {pageProps};
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <Layout>
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
