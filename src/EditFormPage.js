import React from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
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

class EditFormPage extends React.Component {
  state = { editItem: [] };

  componentDidMount() {
    console.log("this.props");
    const editItemRef = firebase
      .database()
      .ref(`list/${this.props.match.params.id}`);
    editItemRef.on("value", snapshot => {
      let editItem = snapshot.val();
      this.setState({ editItem });
    });
  }
  onSubmit(_newvalues) {
    const itemRef = firebase
      .database()
      .ref(`list/${this.props.match.params.id}`);
    itemRef.update(_newvalues);
    console.log(this.props);
    return this.props.history.push("/add");
  }

  render() {
    if (!Object.values(this.state.editItem).length)
      return <div>Loading...</div>;
    return (
      <Styles>
        <h1>Create Page</h1>
        <Form
          onSubmit={this.onSubmit.bind(this)}
          initialValues={this.state.editItem}
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
                  Save
                </button>
              </div>
            </form>
          )}
        />
      </Styles>
    );
  }
}

export default EditFormPage;
