import React from "react";
import { Form, Field } from "react-final-form";
import firebase from "./firebase";
import Styles from "./styles";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const required = value => (value ? undefined : "Required");
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);
const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

const simpleMemoize = fn => {
  let lastArg;
  let lastResult;
  return arg => {
    if (!lastArg || arg !== lastArg) {
      lastArg = arg;
      lastResult = fn(arg);
    }
    return lastResult;
  };
};

const usernameAvailable = simpleMemoize(async value => {
  if (!value) {
    return "Required";
  }
  await sleep(400);
  if (
    ~["john", "paul", "george", "ringo"].indexOf(value && value.toLowerCase())
  ) {
    return "Username taken!";
  }
});

class FormPage extends React.Component {
  state = { list: [] };

  componentDidMount() {
    const listRef = firebase.database().ref("list");
    listRef.on("value", snapshot => {
      let items = snapshot.val();
      const list = [];
      Object.values(items).map(i => list.push(i));
      this.setState({
        list
      });
    });
  }
  onSubmit(_values) {
    const listRef = firebase.database().ref("list");
    listRef.push(_values);
  }

  render() {
    return (
      <Styles>
        <h1>Create Page</h1>
        <Form
          onSubmit={this.onSubmit}
          render={({
            handleSubmit,
            reset,
            submitting,
            pristine,
            validating,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username" validate={usernameAvailable}>
                {({ input, meta }) => (
                  <div>
                    <label>Username</label>
                    <input {...input} type="text" placeholder="Username" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="lastName" validate={required}>
                {({ input, meta }) => (
                  <div>
                    <label>Last Name</label>
                    <input {...input} type="text" placeholder="Last Name" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field
                name="age"
                validate={composeValidators(
                  required,
                  mustBeNumber,
                  minValue(18)
                )}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Age</label>
                    <input {...input} type="text" placeholder="Age" />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )}
        />
        <ul>
          {this.state.list.map(({ username, lastName, age }) => (
            <li>{`${username}- ${lastName}: ${age}`}</li>
          ))}
        </ul>
      </Styles>
    );
  }
}

export default FormPage;
