import React from "react";
import { Form as F, Field } from "react-final-form";
import InputField from "./InputField";
import {
  required,
  mustBeNumber,
  minValue,
  simpleMemoize,
  composeValidators,
  usernameAvailable,
  sleep
} from "../helpers/validate";
import Styles from "../styles";

const Form = ({ onSubmit }) => (
  <Styles>
    <F
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        reset,
        submitting,
        pristine,
        validating,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="username"
            validate={usernameAvailable}
            label="username"
            placeholder="username"
            component={InputField}
          />
          <Field
            name="lastName"
            validate={required}
            label="lastName"
            placeholder="lastName"
            component={InputField}
          />
          <Field
            name="age"
            label="age"
            placeholder="age"
            component={InputField}
            validate={composeValidators(required, mustBeNumber, minValue(18))}
          />
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
  </Styles>
);
export default Form;
