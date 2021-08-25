export default class Events {
  constructor(eventObject) {
    this.id = eventObject.id;
    this.title = eventObject.title;
    this.start = eventObject.start;
    this.end = eventObject.end;
    this.calendar_id = eventObject.calendar_id;
    this.description = eventObject.description;
    this.editable = eventObject.editable;
    this.display = eventObject.display;
    this.color = eventObject.color;
    this.startRecur = eventObject.startRecur;
    this.endRecur = eventObject.endRecur;
    this.textColor = eventObject.textColor;
    this.backgroundColor = eventObject.backgroundColor;
    this.eventResizableFromStart = eventObject.eventResizableFromStart;
    this.eventDurationEditable = eventObject.eventDurationEditable;
    this.eventOverlap = eventObject.eventOverlap;
    this.eventAllow = eventObject.eventAllow;
    this.color = eventObject.color;
  }
}
