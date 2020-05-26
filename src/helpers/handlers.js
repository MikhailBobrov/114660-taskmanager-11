export const getSimpleHandler = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    handler();
  };
};

export const getHandlerWithProp = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    const {prop} = control.dataset;

    if (!prop) {
      return;
    }

    handler(prop);
  };
};

export const getHandlerWithValue = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    if (control.value === undefined) {
      return;
    }

    handler(control.value);
  };
};
