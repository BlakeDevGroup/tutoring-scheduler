import validationService from "../../services/validation/validation.service";
import { EntityTypeError } from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";

export function CalendarEventEntity(eventData, companyData = {}) {
  this.id = eventData.id;
  if (
    !validationService.isUndefined(this.id) &&
    !validationService.isNumeric(this.id)
  )
    throw new EntityTypeError(this.id, ENTITY_TYPES.NUMERIC);

  this.end = eventData.end;

  if (!validationService.isDateTime(this.end))
    throw new EntityTypeError(this.end, ENTITY_TYPES.DATE_TIME);

  this.start = eventData.start;

  if (!validationService.isDateTime(this.start))
    throw new EntityTypeError(this.start, ENTITY_TYPES.DATE_TIME);

  this.title = eventData.title;

  if (!validationService.isString(this.title))
    throw new EntityTypeError(this.title, ENTITY_TYPES.STRING);

  this.allDay = eventData.allDay;

  if (!validationService.isBoolean(this.allDay))
    throw new EntityTypeError(this.allDay, ENTITY_TYPES.BOOLEAN);

  this.user_id = eventData.user_id;

  if (!validationService.isNumeric(this.user_id))
    throw new EntityTypeError(this.user_id, ENTITY_TYPES.NUMERIC);

  this.calendar_id = eventData.calendar_id;

  if (!validationService.isNumeric(this.calendar_id))
    throw new EntityTypeError(this.calendar_id, ENTITY_TYPES.NUMERIC);

  this.company_id = eventData.company_id;

  if (!validationService.isNumeric(this.company_id))
    throw new EntityTypeError(this.company_id, ENTITY_TYPES.NUMERIC);

  this.description = eventData.description;

  if (!validationService.isString(this.description))
    throw new EntityTypeError(this.description, ENTITY_TYPES.STRING);

  this.backgroundColor = companyData.color || "#027788";

  if (!validationService.isString(this.backgroundColor))
    throw new EntityTypeError(this.backgroundColor, ENTITY_TYPES.STRING);

  this.borderColor = companyData.color || "#027788";

  this.editable = true;
  this.display = "block";
}
