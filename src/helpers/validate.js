export const required = value => (value ? undefined : "Required");
export const mustBeNumber = value =>
  isNaN(value) ? "Must be a number" : undefined;
export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const simpleMemoize = fn => {
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
export const usernameAvailable = simpleMemoize(async value => {
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
export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
