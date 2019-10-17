import {Form, Input, TextArea, Button, Image, Message, Header, Icon} from 'semantic-ui-react';
import React, {Fragment, useState, Component} from 'react';
import axios from 'axios';
import baseUrl from "../utils/baseUrl";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: ""
};

function CreateProduct() {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const {name, value, files} = event.target;
    if (name === 'media') {
      setProduct(prevState => ({...prevState, media: files[0]}));
      setMediaPreview(window.URL.createObjectURL(files[0]))
    } else {
      setProduct((prevState) => ({...prevState, [name]: value}));
    }
    // console.log(product);
  }

  async function handleImageUpload() {
    const {media} = product;
    const data = new FormData();
    data.append('file', media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', 'devrole');
    // process.env.CLOUDINARY_URL
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const mediaUrl = await handleImageUpload();
    console.log(mediaUrl);
    const url = `${baseUrl}/api/product`;
    const payload = {...product, mediaUrl};
    const response = await axios.post(url, payload);
    console.log({response});
    setLoading(false);
    setProduct(INITIAL_PRODUCT);
    setSuccess(true);
  }

  const {name, price, description} = product;
  return (
    <Fragment>
      <Header as="h2" block>
        <Icon name="add" color="red"/>
        Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            value={name}
            type="text"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            value={price}
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small"/>
        <Form.Field
          control={Input}
          name="media"
          label="Media"
          content="Select Image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          value={description}
          placeholder="Description"
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={loading}
          color="blue"
          icon="pencil alternate"
          type="submit"
          content="Submit"
        />
      </Form>
    </Fragment>
  );
}

export default CreateProduct;
