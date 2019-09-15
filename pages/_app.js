import App from "next/app";

class MyApp extends App {
  render() {
    const { Component } = this.props;
    return <Component />;
  }
}

export default MyApp;
