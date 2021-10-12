import { EntityTypeError } from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";
import validationService from "../../services/validation/validation.service";

export function ServerEventEntity(eventData, companyData = {}) {
  this.event_id = eventData.event_id;
  if (
    !validationService.isUndefinedOrNull(this.event_id) &&
    !validationService.isNumeric(this.event_id)
  )
    throw new EntityTypeError(this.event_id, ENTITY_TYPES.NUMERIC);

  this.date_end = eventData.date_end;

  if (!validationService.isDateTime(this.date_end))
    throw new EntityTypeError(this.date_end, ENTITY_TYPES.DATE_TIME);

  this.date_start = eventData.date_start;

  if (!validationService.isDateTime(this.date_start))
    throw new EntityTypeError(this.date_start, ENTITY_TYPES.DATE_TIME);

  this.title = eventData.title;

  if (!validationService.isString(this.title))
    throw new EntityTypeError(this.title, ENTITY_TYPES.STRING);

  this.all_day = eventData.all_day;

  if (!validationService.isBoolean(this.all_day))
    throw new EntityTypeError(this.all_day, ENTITY_TYPES.BOOLEAN);

  this.user_id = eventData.user_id;

  if (!validationService.isNumeric(this.user_id))
    throw new EntityTypeError(this.user_id, ENTITY_TYPES.NUMERIC);

  this.calendar_id = eventData.calendar_id;

  if (!validationService.isNumeric(this.calendar_id))
    throw new EntityTypeError(this.calendar_id, ENTITY_TYPES.NUMERIC);

  this.description = eventData.description;

  if (!validationService.isString(this.description))
    throw new EntityTypeError(this.description, ENTITY_TYPES.STRING);

  this.company_id = eventData.company_id;

  if (
    !validationService.isUndefinedOrNull(this.company_id) &&
    !validationService.isNumeric(this.company_id)
  )
    throw new EntityTypeError(this.company_id, ENTITY_TYPES.NUMERIC);
}
