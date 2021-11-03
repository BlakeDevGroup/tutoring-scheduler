const isDateTime = (dateTimeString) => {
  const match = dateTimeString.match(
    /[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/
  );

  return !!match && !isNaN(new Date(dateTimeString).getTime());
};

const isDate = (dateString) => {
  return !isNaN(new Date(dateString).getTime());
};

const isString = (string) => {
  return typeof string === "string";
};

const isNumeric = (number) => {
  if (typeof number === "string") return !isNaN(parseInt(number));

  return typeof number === "number";
};

const isTime = (timeString) => {
  const match = timeString.match(/[0-9]{2}:[0-9]{2}[ap][m]/);

  return match ? true : false;
};

const isUndefined = (value) => {
  return value === undefined;
};

const isBoolean = (value) => {
  return typeof value === "boolean";
};

const isMilitaryTime = (value) => {
  return RegExp(/[0-9]{2}:[0-9]{2}$/).test(value);
};

const isArray = (value) => {
  if (value !== null && typeof value == "object") {
    if (value.length >= 0) return true;
  }
  return false;
};

const isUndefinedOrNull = (value) => {
  if (isUndefined(value) || isNull(value)) return true;
  return false;
};

const isNull = (value) => {
  if (value === null) return true;
  return false;
};

export default {
  isDateTime: isDateTime,
  isDate: isDate,
  isString: isString,
  isNumeric: isNumeric,
  isTime: isTime,
  isUndefined: isUndefined,
  isBoolean: isBoolean,
  isMilitaryTime: isMilitaryTime,
  isArray: isArray,
  isUndefinedOrNull: isUndefinedOrNull,
  isNull: isNull,
};
