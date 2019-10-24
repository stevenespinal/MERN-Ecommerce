import {Button, Form, Icon, Segment, Message} from 'semantic-ui-react';
import React, {Fragment, useState, useEffect} from 'react';
import Link from "next/link";
import catchErrors from "../utils/catchErrors";
import baseUrl from "../utils/baseUrl";
import axios from 'axios';
import {handleLogin} from "../utils/auth";

const INITIAL_USER = {
  email: "",
  password: ""
};

function Login() {
  const [user, setUser] = useState(INITIAL_USER);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);


  function handleChange(event) {
    const {name, value} = event.target;
    setUser(prevState => ({...prevState, [name]: value}));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      // console.log(user)
      //  make request to signup the user
      const url = `${baseUrl}/api/login`;
      const payload = {...user};
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  const {name, email, password} = user;
  return (
    <Fragment>
      <Message
        attached
        icon="privacy"
        header="Welcome Back!"
        color="blue"
        content="Log in with email and password"
      />
      <Form error={Boolean(error)} onSubmit={handleSubmit} loading={loading}>
        <Message error header="Oops" content={error}/>
        <Segment>

          <Form.Input
            icon="envelope"
            fluid
            iconPosition="left"
            label="Email"
            name="email"
            value={email}
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <Form.Input
            icon="lock"
            fluid
            iconPosition="left"
            label="Password"
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <Button
            disabled={disabled || loading}
            icon="sign in"
            type="submit"
            color="red"
            content="login"/>
        </Segment>
      </Form>
      <Message attached="bottom" warning>
        <Icon name="help"/>
       New User? {" "}
        <Link href="/signup">
          <a>Sign Up here</a>
        </Link>{" "}instead.
      </Message>
    </Fragment>
  );
}

export default Login;
