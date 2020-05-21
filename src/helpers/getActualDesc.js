export const getActualDesc = (taskData) => {
  const description = taskData.description || ``;
  const savedDescription = taskData.savedDescription;

  if (savedDescription !== null && savedDescription !== undefined) {
    return savedDescription;
  }

  return description;
};
