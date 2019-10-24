import App from "next/app";
import Layout from "../components/_App/Layout";
import {parseCookies, destroyCookie} from "nookies";
import {redirectUser} from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import axios from 'axios';
import Router from 'next/router';

// _app gives us access to every single page
// useful for authenticating users
//can pass down data to every single page
class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    // can create variable cookies from this helper function or can destructure token from cookies.token
    const {token} = parseCookies(ctx);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create';

      if (isProtectedRoute) {
        redirectUser(ctx, '/login');
      }
    } else {
      try {
        const payload = {headers: {Authorization: token}};
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;
        // if authenticated but not a role of admin or root then they are a user
        const isRoot = user.role === 'root';
        const isAdmin = user.role === 'admin';
        // if isRoot or isAdmin is false meaning they are a user role and the pathname of the webpage is create
        const isNotPermitted = !(isRoot || isAdmin) && ctx.pathname === '/create';
        if (isNotPermitted) {
          // we want to redirect from /create page
          redirectUser(ctx, "/")
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
      //  throw out invalid token
        destroyCookie(ctx, "token");
      //  redirect back to login so they can get a brand new valid token
        redirectUser(ctx, "/login");
      }
    }
    return {pageProps};
  }

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout);
  }

  syncLogout = event => {
    const {key} = event;
    if (key === 'logout') {
      console.log("logged out from storage");
      Router.push("/login")
    }
  };


  render() {
    const {Component, pageProps} = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps}/>
      </Layout>
    );
  }
}

export default MyApp;
