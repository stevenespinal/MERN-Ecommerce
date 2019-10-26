import {Header, Segment, Accordion, Label, Icon, Button, List, Image} from "semantic-ui-react";
import React, {Fragment} from 'react';
import {useRouter} from "next/router";
import formatDate from "../../utils/formatDate";

function AccountOrders({orders}) {
  const router = useRouter();

  function mapOrdersToPanels(orders) {
    return orders.map(order => ({
      key: order._id,
      title: {
        content: <Label color="blue" content={formatDate(order.createdAt)}/>
      },
      content: {
        content: (
          <Fragment>
            <List.Header as="h3">
              Total: ${order.total}
              <Label content={order.email} icon="mail" basic horizontal style={{marginLeft: "1em"}}/>
            </List.Header>
            <List>
              {order.products.map(p => (
                <List.Item key={order._id}>
                  <Image avatar src={p.product.mediaUrl}/>
                  <List.Content>
                    <List.Header>
                      {p.product.name}
                    </List.Header>
                    <List.Description>{p.quantity} x ${p.product.price}</List.Description>
                  </List.Content>
                  <List.Content floated="right">
                    <Label tag color="red" size="tiny">
                      {p.product.sku}
                    </Label>
                  </List.Content>
                </List.Item>
              ))}
            </List>
          </Fragment>
        )
      }
    }))
  }

  return (
    <Fragment>
      <Header as="h2">
        <Icon name="folder open"/>
        Order History
      </Header>
      {orders.length === 0 ? (
        <Segment inverted tertiary color="grey" textAlign="center">
          <Header icon>
            <Icon name="copy outline"/>
            No past orders.
          </Header>
          <div>
            <Button color="orange" onClick={() => router.push("/")}>
              View Products
            </Button>
          </div>
        </Segment>
      ) : (
        <Accordion fluid styled exclusive={false} panels={mapOrdersToPanels(orders)}>

        </Accordion>
      )}
    </Fragment>
  );
}

export default AccountOrders;
