import {
    Box,
    Button,
    Layer,
    TextInput,
    Form,
    Grommet,
  } from "grommet";
  import {
    Add,
  } from "grommet-icons";
  import React, { useState } from "react";
  import Companies from "../../models/companies";
  import CompanyDropMenu from "./Company-drop-menu";
  import companiesData from "../../data/companies.json"
  import CompanyTitle from "./cTitle";
  import CompanyPay from "./cPay";
  



  export const setNewCompanies = (companies, newCompany, setCompany) => {

    const newCompanies= [].concat(companies, [newCompany])
    
    console.log(newCompanies)

    setCompany(newCompanies)
  };




  function CompanyButton(props) {
    const [show, setShow] = React.useState();
    const [textValue, setTextValue] = useState("");
    const [title, setTitle] = React.useState("");
    const [pay, setPay] = React.useState("");
    return (
      <Box>
        <Button 
        primary
        label="Add company"
        alignSelf="start"
        color=""
        size="large"
        icon={<Add />}
        hoverIndicator="true" 
        onClick={() => setShow(true)} />
        {show && (
        <Layer
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
          >  
          <Box
            margin={{ top: "small", bottom: "small", right: "medium", left: "medium"}} height="small" width="medium" overflow="auto"
          >
            <Box>
              <CompanyTitle
                onChange={setTitle}
                value={title}
              />
            </Box>
            <Box>
              <CompanyPay
                onChange={setPay}
                value={pay}
              />
            </Box>
            <Box>
              <Button
                label="save"
                size="small"
                alignSelf="center"
                hoverIndicator
                margin={{ top: "medium", left: "medium", right:"medium", bottom:"medium"}}
                background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
                onClick={() => {
                  setNewCompanies(props.companies, {
                    "companyName":title,
                    "pay":pay,              
                  }, props.setCompanies)
                  setShow(false)
                }
              }/>

            </Box>
          </Box>
        </Layer>
        )}
      </Box>
    );
  }

export default CompanyButton