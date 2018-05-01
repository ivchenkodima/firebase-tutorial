import React from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import Form from "./components/Form";

class FormPage extends React.Component {
  state = { list: [] };

  componentDidMount() {
    const listRef = firebase.database().ref("list");
    listRef.on("value", snapshot => {
      let list = snapshot.val();
      this.setState({ list });
      console.log(this.state);
    });
  }
  onSubmit(_values) {
    const listRef = firebase.database().ref("list");
    listRef.push(_values);
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/list/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div>
        <h1>Create Page</h1>
        <Form onSubmit={this.onSubmit} />
        <ul>
          {Object.entries(this.state.list).map(
            ([title, { username, lastName, age }], key) => (
              <li key={key}>
                {`${username}- ${lastName}: ${age}`}
                <Link to={title}>Edit</Link>
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
}

export default FormPage;
