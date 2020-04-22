const templateElem = document.createElement(`template`);

export const createElement = (str) => {
  if (!str) {
    return null;
  }

  templateElem.innerHTML = str;
  return templateElem.content.firstElementChild;
};
