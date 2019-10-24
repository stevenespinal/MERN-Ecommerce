import cookie from  'js-cookie';
import Router from 'next/router';

export function handleLogin(token) {
  // sets the cookie using js-cookie package, name is token and value is the
  //token parameter
  cookie.set('token', token);
  // redirects back to /account route
  Router.push("/account");
}

export function redirectUser(ctx, location) {
//  since we have access to ctx we can redirect from server side
  if (ctx.req) {
    // 302 status code shows it's a redirect
    ctx.res.writeHead(302, {Location: location});
    ctx.res.end();
  } else {
    Router.push(location)
  }
}

export function handleLogout() {
  cookie.remove('token');
  Router.push("/login");
}