import React, { Component } from "react";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  formChangeHandler = (event) => {
    this.setState({ message: event.target.value });
  };

  testMessageinput(input) {
    var allowedchars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890?!@,. ' \"- ’ \n \t ”“";
    var maxlength = 3000;

    console.log(input.length);

    if (input.length <= 0) {
      return [false, "Message is empty!"];
    }
    if (input.length > maxlength) {
      return [false, "Message is too long! Keep it under 3000 characters please."];
    }

    for (let i = 0; i < input.length; i++) {
      console.log(input[i]);
      if (!allowedchars.includes(input[i])) {
        return [false, "Invalid characters detected! Please stick with letters, numbers, and punctuation."];
      }
    }
    return [true, "None"];
  }

  async postData(theData) {
    try {
      var validString,
        errorMsg = this.testMessageinput(theData);
      let result = await fetch(process.env.POST_URL, {
        method: "post",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          message: theData,
        }),
      });
      console.log(result);
      this.props.history.push("/post");
    } catch (e) {
      console.log(e);
      this.props.history.push("/failed");
    }
  }

  async handlePost(theData) {
    var [isValid, errorMsg] = this.testMessageinput(theData);

    if (isValid) {
      this.postData(theData);
    } else {
      alert(errorMsg);
    }
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <div className="App">
        <Route path="/" exact 
        render={(props) => {
            return (
              <div>
                <h2>Send a Message</h2>
                <br />
                <form>
                  <textarea rows="5" cols="60" name="description" onChange={this.formChangeHandler}/>
                  <br />
                  <br />
                  <button type="button" onClick={() => this.handlePost(this.state.message)}>Submit</button>
                </form>
                <br />
                <br />
                <p>Once done, call (334) 234-2688 to hear messages left by you and others!</p>
                <hr />

                <div>
                  <h3>What is this?</h3>
                  <p>It's a voip forum I made for fun. Watch This.</p>
                  <br /> github
                </div>
              </div>
            );
          }}
        />

        <Route path="/post" exact
          render={(props) => {
            return (
              <div>
                <b>SUCCESS!</b>
                <br />
                <br />
                <a href="/">Send another message!</a>
              </div>
            );
          }}
        />

        <Route path="/failed" exact
          render={(props) => {
            return (
              <div>
                <b>Failed to send!</b>
                <br />
                <br />
                <a href="/">try again!</a>
              </div>
            );
          }}
        />
      </div>
    );
  }
}
export default withRouter(App);
