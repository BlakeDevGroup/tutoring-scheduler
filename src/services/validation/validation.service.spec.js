import chai, { expect } from "chai";
import sinon, { stub } from "sinon";
import sinonChai from "sinon-chai";
import validationService from "./validation.service";
import ValidationService from "./validation.service";

chai.use(sinonChai);

let sandBox;
describe("ValidationService", () => {
  before(() => {
    sandBox = sinon.createSandbox();
  });

  after(() => {
    sandBox.restore();
  });

  describe("validate DateTime", () => {
    it("when dateTime is invalid then return false", () => {
      let result = ValidationService.isDateTime("XXXX");

      expect(result).to.equal(false);

      result = ValidationService.isDateTime("10-20-2021123123");

      expect(result).to.equal(false);

      result = ValidationService.isDateTime("101203123-30-45");
    });

    it("when dateTime does not include time then return false", () => {
      let result = ValidationService.isDateTime("2021-10-30");

      expect(result).to.equal(false);
    });

    it("when dateTime does not have format HH:MM:DDThh:mm then return false", () => {
      let result = ValidationService.isDateTime("10-30-2021T10:30");

      expect(result).to.equal(false);
    });

    it("when dateTime is valid return true", () => {
      let result = ValidationService.isDateTime("2021-10-30T10:30");

      expect(result).to.equal(true);
    });
  });

  describe("validate Date", () => {
    it("when dateString is invalid throw error", () => {
      let result = ValidationService.isDate("XXXX");

      expect(result).to.equal(false);
    });

    it("when dateString is valid then return true", () => {
      let result = ValidationService.isDate("10-21-2020");

      expect(result).to.equal(true);

      result = ValidationService.isDate("2021-10-30");

      expect(result).to.equal(true);

      result = ValidationService.isDate("2021-10-30T10:30");

      expect(result).to.equal(true);
    });
  });

  describe("validate Time", () => {
    it("when timeString is invalid then return false", () => {
      let result = ValidationService.isTime("XXXX");

      expect(result).to.equal(false);

      result = ValidationService.isTime("10:30");

      expect(result).to.equal(false);

      result = ValidationService.isTime("10:30px");

      expect(result).to.equal(false);

      result = ValidationService.isTime("1:30pm");

      expect(result).to.equal(false);
    });

    it("when timeString is valid then return true", () => {
      let result = ValidationService.isTime("10:30pm");

      expect(result).to.equal(true);

      result = ValidationService.isTime("01:30am");

      expect(result).to.equal(true);

      result = ValidationService.isTime("12:00am");

      expect(result).to.equal(true);
    });
  });

  describe("validate String", () => {
    it("when string is invalid then return false", () => {
      const result = ValidationService.isString(123);

      expect(result).to.equal(false);
    });

    it("when string is valid then return true", () => {
      const result = ValidationService.isString("TestString");

      expect(result).to.equal(true);
    });
  });

  describe("validate Numeric", () => {
    it("when value is not a number then return false", () => {
      const result = ValidationService.isNumeric("ASDF");

      expect(result).to.equal(false);
    });

    it("when value is a string but numeric then return true", () => {
      let result = ValidationService.isNumeric("123.45");

      expect(result).to.equal(true);

      result = ValidationService.isNumeric("123");

      expect(result).to.equal(true);

      result = ValidationService.isNumeric(1);

      expect(result).to.equal(true);

      result = ValidationService.isNumeric(45674.445);

      expect(result).to.equal(true);
    });
  });

  describe("validate undefined", () => {
    it("when value is not undefined then return false", () => {
      let result = ValidationService.isUndefined("123");

      expect(result).to.equal(false);

      result = validationService.isUndefined(null);

      expect(result).to.equal(false);

      result = validationService.isUndefined([]);

      expect(result).to.equal(false);

      result = validationService.isUndefined("");

      expect(result).to.equal(false);
    });

    it("when value is undefined then return true", () => {
      const result = ValidationService.isUndefined(undefined);

      expect(result).to.equal(true);
    });
  });

  describe("validate boolean", () => {
    it("when value is not a boolean then return false", () => {
      let result = ValidationService.isBoolean("123");

      expect(result).to.equal(false);

      result = ValidationService.isBoolean([]);

      expect(result).to.equal(false);

      result = ValidationService.isBoolean(null);

      expect(result).to.equal(false);
    });

    it("when value is a boolean then return true", () => {
      let result = ValidationService.isBoolean(true);

      expect(result).to.equal(true);
    });
  });

  describe("validate military time", () => {
    it("when timeString is not miliary time then return false", () => {
      let result = ValidationService.isMilitaryTime("10:30am");

      expect(result).to.equal(false);

      result = ValidationService.isMilitaryTime("01:99am");
    });

    it("when timeString is military time then return true", () => {
      let result = ValidationService.isMilitaryTime("10:30");

      expect(result).to.equal(true);

      result = ValidationService.isMilitaryTime("01:30");

      expect(result).to.equal(true);
    });
  });

  describe("validate array", () => {
    it("when value is not an array then return false", () => {
      let result = ValidationService.isArray("ASDF");

      expect(result).to.equal(false);

      result = validationService.isArray(null);

      expect(result).to.equal(false);

      result = validationService.isArray(function () {
        return "yes";
      });

      expect(result).to.equal(false);

      result = validationService.isArray({});

      expect(result).to.equal(false);

      result = validationService.isArray(undefined);

      expect(result).to.equal(false);
    });

    it("when value is an array then reutn true", () => {
      let result = ValidationService.isArray([]);

      expect(result).to.equal(true);
    });
  });
});
