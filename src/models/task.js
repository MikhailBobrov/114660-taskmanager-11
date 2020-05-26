const checkisDeadline = (isRepeat, date) => {
  if (isRepeat) {
    return false;
  }

  return date && date < new Date();
};

export default class Task {
  constructor(taskData) {
    this.id = taskData[`id`];
    this.description = taskData[`description`];
    this.dueDate = taskData[`due_date`] ? new Date(taskData[`due_date`]) : null;
    this.weekDays = taskData[`repeating_days`];
    this.color = taskData[`color`];
    this.isRepeat = Object.values(this.weekDays).some((item) => item);
    this.isFavorite = taskData[`is_favorite`];
    this.isArchive = taskData[`is_archived`];
    this.isDeadline = checkisDeadline(this.isRepeat, this.dueDate);
  }

  toRaw() {
    return {
      'id': this.id,
      'description': this.description,
      'due_date': this.dueDate ? this.dueDate.toISOString() : null,
      'repeating_days': this.weekDays,
      'color': this.color,
      'is_archived': this.isArchive,
      'is_favorite': this.isFavorite
    };
  }

  static objectToTask(taskData) {
    const convertedData = {
      'id': taskData.id,
      'description': taskData.description,
      'due_date': taskData.dueDate ? taskData.dueDate.toISOString() : null,
      'repeating_days': taskData.weekDays,
      'color': taskData.color,
      'is_archived': taskData.isArchive,
      'is_favorite': taskData.isFavorite
    };

    return new Task(convertedData);
  }

  static parseTask(taskData) {
    return new Task(taskData);
  }

  static parseTasks(tasksData) {
    return tasksData.map(Task.parseTask);
  }

  static clone(taskData) {
    return new Task(taskData.toRaw());
  }
}
