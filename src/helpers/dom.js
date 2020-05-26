import {RenderPosition} from "../constants";

const templateElem = document.createElement(`template`);

export const createElement = (str) => {
  if (!str) {
    return null;
  }

  templateElem.innerHTML = str;
  return templateElem.content.firstElementChild;
};

export const removeElement = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const handleComponent = (target, component, place) => {
  let element = component;

  if (component instanceof HTMLElement === false) {
    element = component.getElement();
  }

  if (!element) {
    return;
  }

  if (place === RenderPosition.BEGIN) {
    target.prepend(element);
  } else {
    target.append(element);
  }
};

export const renderElement = (target, component, place = RenderPosition.END) => {
  if (!Array.isArray(component)) {
    handleComponent(target, component, place);

    return;
  }

  const items = component;

  for (const item of items) {
    handleComponent(target, item, place);
  }
};

export const replaceElement = (componentFrom, componentTo) => {
  if (!componentFrom && !componentTo) {
    return;
  }

  componentFrom.getElement().replaceWith(componentTo.getElement());
};

