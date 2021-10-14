import axios from "axios";
import MessageService from "../../services/messaging/message.service";
import CONFIG from "../../config";

export default class CompanyApi {
  constructor() {
    this.apiController = axios.create({
      baseURL: process.env.REACT_APP_SERVICE_URL,
      timeout: 1000,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });
  }
  async getAllCompanies() {
    try {
      const result = await this.apiController.get(`/companies`);
      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "heep",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async getCompanyById(company_id) {
    try {
      const reult = await this.apiController.get(`/companies/${company_id}`);

      if (reult.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async createCompany(company_id, payload) {
    try {
      const result = await this.apiController.post(`/companies`, payload);

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async deleteCompany(company_id) {
    try {
      const result = await this.apiController.delete(
        `/companies/${company_id}`
      );

      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async updateCompany(company_id, payload) {
    try {
      const result = await this.apiController.put(
        `/companies/${company_id}`,
        payload
      );
      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }

  async patchCompany(company_id, payload) {
    try {
      const result = await this.apiController.patch(
        `/companies/${company_id}`,
        payload
      );
      if (result.data.success) {
        return MessageService.sendSuccess(
          "http",
          result.data.message,
          result.data.data
        );
      } else {
        return MessageService.sendFailure(
          "http",
          result.data.message,
          result.data.error
        );
      }
    } catch (e) {
      return MessageService.sendFailure("error", e.message, e);
    }
  }
}

export const prepCompanyData = (companyData) => {
  return companyData.map((company) => {
    return {
      name: company.name,
      company_id: company.company_id,
      pay: company.pay_rate,
      color: company.color,
    };
  });
};
