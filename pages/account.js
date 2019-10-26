import AccountHeader from "../components/Account/AccountHeader";
import AccountOrders from "../components/Account/AccountOrders";
import React, {Fragment} from 'react';


function Account({user}) {
  return (
    <Fragment>
      <AccountHeader {...user}/>
      <AccountOrders/>
    </Fragment>
  );
}


export default Account;
