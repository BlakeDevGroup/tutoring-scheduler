export function EntityTypeError(value, expected) {
  const MESSAGE = `Invalid type for value: ${value}, expected type ${expected}`;
  return new Error(MESSAGE);
}
