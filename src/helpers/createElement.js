const templateElem = document.createElement(`template`);

export const createElement = (str) => {
  if (!str) {
    return ``;
  }

  templateElem.innerHTML = str;
  return templateElem.content.firstElementChild;
};
