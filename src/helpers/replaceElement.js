export const replaceElement = (componentFrom, componentTo) => {
  componentFrom.getElement().replaceWith(componentTo.getElement());
};
