export const replaceElement = (componentFrom, componentTo) => {
  if (!componentFrom && !componentTo) {
    return;
  }

  componentFrom.getElement().replaceWith(componentTo.getElement());
};
