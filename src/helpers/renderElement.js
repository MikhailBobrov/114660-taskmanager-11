import {RenderPositions} from "../constants";

const handleComponent = (target, component, place) => {
  let element = component;

  if (component instanceof HTMLElement === false) {
    element = component.getElement();
  }

  if (!element) {
    return;
  }

  if (place === RenderPositions.BEGIN) {
    target.prepend(element);
  } else {
    target.append(element);
  }
};

export const renderElement = (target, component, place = RenderPositions.END) => {
  if (!Array.isArray(component)) {
    handleComponent(target, component, place);

    return;
  }

  const items = component;

  for (const item of items) {
    handleComponent(target, item, place);
  }
};
