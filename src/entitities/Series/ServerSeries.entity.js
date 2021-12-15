import validationService from "../../services/validation/validation.service";
import { EntityTypeError } from "../EntityTypeError";
import { ENTITY_TYPES } from "../EntityTypes";

export function ServerSeriesEntity(seriesData) {
  this.start_time = seriesData.start_time;
  if (!validationService.isMilitaryTime(this.start_time))
    throw new EntityTypeError(this.start_time, ENTITY_TYPES.MILITARY_TIME);

  this.end_time = seriesData.end_time;
  if (!validationService.isMilitaryTime(this.end_time))
    throw new EntityTypeError(this.end_time, ENTITY_TYPES.MILITARY_TIME);

  this.start_recur = seriesData.start_recur;
  if (!validationService.isDate(this.start_recur))
    throw new EntityTypeError(this.start_recur, ENTITY_TYPES.DATE);

  this.end_recur = seriesData.end_recur;
  if (this.end_recur && !validationService.isDate(this.end_recur))
    throw new EntityTypeError(this.end_recur, ENTITY_TYPES.DATE);

  this.days_of_week = seriesData.days_of_week;
  if (!validationService.isArray(this.days_of_week))
    throw new EntityTypeError(this.days_of_week, ENTITY_TYPES.ARRAY);

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
  if (!validationService.isUndefinedOrNull(this.company_id) &&!validationService.isNumeric(this.user_id))
    throw new EntityTypeError(this.user_id, ENTITY_TYPES.NUMERIC);

  this.company_id = seriesData.company_id;
  if (
    !validationService.isUndefinedOrNull(this.company_id) &&
    !validationService.isNumeric(this.company_id)
  )
    throw new EntityTypeError(this.company_id, ENTITY_TYPES.NUMERIC);

  this.series_id = seriesData.series_id;
  if (
    !validationService.isUndefinedOrNull(this.series_id) &&
    !validationService.isNumeric(this.series_id)
  )
    throw new EntityTypeError(this.series_id, ENTITY_TYPES.NUMERIC);
}
