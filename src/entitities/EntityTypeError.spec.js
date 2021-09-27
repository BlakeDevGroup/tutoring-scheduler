import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import { EntityTypeError } from "./EntityTypeError";

chai.use(sinonChai);

describe("EntityTypeError", () => {
  it("should return error with proper Message", () => {
    const value = "asdf";
    const expected = "Numeric";
    const error = new EntityTypeError(value, expected);

    expect(error).to.be.an("error");
    expect(error.message).to.equal(
      `Invalid type for value: ${value}, expected type ${expected}`
    );
  });
});
