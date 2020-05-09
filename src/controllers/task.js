import Card from '../components/card';
import CardEdit from '../components/card-edit';
import {renderElement, replaceElement} from '../helpers';

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._toggleProp = this._toggleProp.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._saveText = this._saveText.bind(this);
    this._updateText = this._updateText.bind(this);
    this._toggleWeekDay = this._toggleWeekDay.bind(this);
    this._setFormControlsEnabledState = this._setFormControlsEnabledState.bind(this);
    this._replaceCardToEdit = this._replaceCardToEdit.bind(this);
    this._replaceEditTocard = this._replaceEditTocard.bind(this);
  }

  setDefaultView() {
    this._replaceEditTocard();
  }

  _toggleProp(prop) {
    const newTaskData = Object.assign(
        {},
        this._taskData,
        {[prop]: !this._taskData[prop]}
    );

    this._onDataChange(this._taskData, newTaskData);
  }

  _changeColor(color) {
    const newTaskData = Object.assign(
        {},
        this._taskData,
        {color}
    );

    this._onDataChange(this._taskData, newTaskData);
  }

  _saveText(text) {
    // Save text without rerendering
    this._taskData.description = text;

    this._setFormControlsEnabledState(!!text);
  }

  _updateText() {
    this._onDataChange(this._taskData, this._taskData);
  }

  _toggleWeekDay(value) {
    const newTaskData = Object.assign(
        {},
        this._taskData
    );

    newTaskData.weekDays = Object.assign(
        {},
        newTaskData.weekDays
    );

    newTaskData.weekDays[value] = !newTaskData.weekDays[value];

    this._onDataChange(this._taskData, newTaskData);
  }

  _setFormControlsEnabledState(state) {
    this._cardEditComponent.setFormControlsEnabledState(state);
  }

  _replaceCardToEdit() {
    this._onViewChange();
    replaceElement(this._cardComponent, this._cardEditComponent);
  }

  _replaceEditTocard() {
    this._updateText();

    replaceElement(this._cardEditComponent, this._cardComponent);
  }

  _setCardComponentHandlers() {
    this._cardComponent.setEditBtnHandler(this._replaceCardToEdit);
    this._cardComponent.setControlsClickHandler(this._toggleProp);
  }

  _setCardEditComponentHandlers() {
    this._cardEditComponent.setSubmitHandler(this._replaceEditTocard);
    this._cardEditComponent.setColorsClickHandler(this._changeColor);
    this._cardEditComponent.setWeekDaysControlsClickHandler(this._toggleWeekDay);
    this._cardEditComponent.setRepeatClickHandler(this._toggleProp);
    this._cardEditComponent.setTextInputHandler(this._saveText);
  }

  render(taskData) {
    this._taskData = taskData;
    const oldTaskComponent = this._cardComponent;
    const oldTaskEditComponent = this._cardEditComponent;
    this._cardComponent = new Card(taskData);
    this._cardEditComponent = new CardEdit(taskData, this._toggleProp);

    this._setCardComponentHandlers();
    this._setCardEditComponentHandlers();

    if (oldTaskComponent && oldTaskEditComponent) {
      replaceElement(oldTaskComponent, this._cardComponent);
      replaceElement(oldTaskEditComponent, this._cardEditComponent);
    } else {
      renderElement(this._container, this._cardComponent);
    }
  }
}
