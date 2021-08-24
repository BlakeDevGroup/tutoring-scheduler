import CompanyButton from "../nav-bar/add-company-button/Add-new-company"

export default class Companies {

    constructor(companyObject) {
        this.id = companyObject.id;
        this.companyName = companyObject.companyName
        this.companyPay = companyObject.companyPay
    }


}