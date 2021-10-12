import validationService from "../../services/validation/validation.service";
import { EntityTypeError } from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";

export function CalendarSeriesEntity(seriesData, companyData = {}) {
  this.startTime = seriesData.startTime;
  if (!validationService.isMilitaryTime(this.startTime))
    throw new EntityTypeError(this.startTime, ENTITY_TYPES.MILITARY_TIME);

  this.endTime = seriesData.endTime;
  if (!validationService.isMilitaryTime(this.endTime))
    throw new EntityTypeError(this.endTime, ENTITY_TYPES.MILITARY_TIME);

  this.startRecur = seriesData.startRecur;
  if (!validationService.isDate(this.startRecur))
    throw new EntityTypeError(this.startRecur, ENTITY_TYPES.DATE);

  this.endRecur = seriesData.endRecur;
  if (this.endRecur && !validationService.isDate(this.endRecur))
    throw new EntityTypeError(this.endRecur, ENTITY_TYPES.DATE);

  this.daysOfWeek = seriesData.daysOfWeek;
  if (!validationService.isArray(this.daysOfWeek))
    throw new EntityTypeError(this.daysOfWeek, ENTITY_TYPES.ARRAY);

  this.title = seriesData.title;
  if (!validationService.isString(this.title))
    throw new EntityTypeError(this.title, ENTITY_TYPES.STRING);

  this.description = seriesData.description;
  if (!validationService.isString(this.description))
    throw new EntityTypeError(this.description, ENTITY_TYPES.STRING);

  this.calendar_id = seriesData.calendar_id;
  if (!validationService.isNumeric(this.calendar_id))
    throw new EntityTypeError(this.calendar_id, ENTITY_TYPES.NUMERIC);

  this.user_id = seriesData.user_id;
  if (!validationService.isNumeric(this.user_id))
    throw new EntityTypeError(this.user_id, ENTITY_TYPES.NUMERIC);

  this.company_id = seriesData.company_id;
  if (
    !validationService.isUndefinedOrNull(this.company_id) &&
    !validationService.isNumeric(this.company_id)
  )
    throw new EntityTypeError(this.company_id, ENTITY_TYPES.NUMERIC);

  this.groupId = seriesData.groupId;
  if (
    !validationService.isUndefinedOrNull(this.groupId) &&
    !validationService.isNumeric(this.groupId)
  )
    throw new EntityTypeError(this.groupId, ENTITY_TYPES.NUMERIC);

  this.backgroundColor = companyData.color || "#027788";

  if (!validationService.isString(this.backgroundColor))
    throw new EntityTypeError(this.backgroundColor, ENTITY_TYPES.STRING);

  this.borderColor = companyData.color || "#027788";

  this.editable = true;
  this.display = "block";
}
