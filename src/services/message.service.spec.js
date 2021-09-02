import sinon from "sinon";
import { expect } from "chai";
import winston from "winston";
import MessageService from "./message.service";

let logStub;
let sandBox;

describe("MessageService", () => {
  before(() => {
    sandBox = sinon.createSandbox();
  });
  beforeEach(() => {
    logStub = sandBox.stub(winston, "log");
  });
  afterEach(() => {
    logStub.restore();
    sandBox.restore();
  });

  it("log response and return success object", () => {
    const result = MessageService.sendSuccess("info", "Success", []);

    expect(logStub).to.be.calledOnce;
    expect(logStub).calledWith("info", "Success");

    expect(result)
      .to.be.an("object")
      .and.include.keys("success", "message", "data");

    expect(result.success).to.equal(true);
    expect(result.message).to.equal("Success");
    expect(result.data).to.be.an("array");
    expect(result.data.length).to.equal(0);
  });

  it("log error and return failure object", () => {
    const ERROR = new Error("Failed");

    const result = MessageService.sendFailure("error", "Failed", ERROR);
    expect(logStub).to.be.calledOnce;
    expect(logStub).calledWith("error", "Failed");

    expect(result)
      .to.be.an("object")
      .and.include.keys("success", "message", "error");

    expect(result.success).to.equal(false);
    expect(result.message).to.equal("Failed");
    expect(result.error).to.be.equal(ERROR);
  });
});
