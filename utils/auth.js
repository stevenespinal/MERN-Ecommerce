import cookie from  'js-cookie';
import Router from 'next/router';

export function handleLogin(token) {
  // sets the cookie using js-cookie package, name is token and value is the
  //token parameter
  cookie.set('token', token);
  // redirects back to /account route
  Router.push("/account");
}