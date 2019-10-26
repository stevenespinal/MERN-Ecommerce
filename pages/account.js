import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import AccountPermissions from "../components/Account/AccountPermissions";
import React, {Fragment} from 'react';
import {parseCookies} from 'nookies';
import baseUrl from "../utils/baseUrl";
import axios from 'axios';

function Account({user, orders}) {
  console.log(orders);
  return (
    <Fragment>
      <AccountHeader {...user}/>
      <AccountOrders orders={orders}/>
      {user.role === "root" && <AccountPermissions currentUserId={user._id} />}
    </Fragment>
  );
}

Account.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx);
  if (!token) {
    return {orders: []}
  }
  const payload = {headers: {Authorization: token}};
  const url = `${baseUrl}/api/orders`;

  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;
