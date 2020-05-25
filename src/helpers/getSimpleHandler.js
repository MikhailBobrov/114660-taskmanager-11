export const getSimpleHandler = (selector, handler) => {
  return (event) => {
    const control = event.target.closest(selector);

    if (!control) {
      return;
    }

    handler();
  };
};
