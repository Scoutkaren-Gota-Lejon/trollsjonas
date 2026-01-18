import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { Checkbox, FormControlLabel } from "@mui/material";

const MIN_PERSONS = 16;
const PRICE_DAY = 90;
const PRICE_SCOUTING_DAY = 75;
const ADDON_WINTER = 0.15;

const FormContainer = styled.form`
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
  max-width: 700px;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const TextFieldCust = ({label, value, field, type = 'text', fullWidth = true, margin = 'normal', onChange}) => {
  return (
    <TextField
      label={label}
      value={value}
      placeholder={label}
      name={field}
      type={type}
      fullWidth={fullWidth}
      onChange={onChange}
      margin={margin} />
  )
};

export default function PriceCalc() {
  const [persons, setPersons] = useState();
  const [days, setDays] = useState();
  const [scouting, setScouting] = useState(false);
  const [price, setPrice] = useState("-");

  // TODO: Vintertillägg

  useEffect(() => {
    if (days && persons) {
      const priceOneDay = Math.max(MIN_PERSONS, persons) * (scouting ? PRICE_SCOUTING_DAY : PRICE_DAY);

      setPrice(priceOneDay * days);
    } else {
      setPrice("-");
    }
  }, [persons, days, scouting]);

  return (
    <FormContainer noValidate autoComplete="off">
      <TextFieldCust 
        label="Antal personer" 
        field="count" 
        value={persons ?? ""} 
        onChange={(e) => {
          const v = parseInt(e.target.value);
          if (isNaN(v)) {
            setPersons(undefined);
          } else {
            setPersons(v);
          }
        }} 
      />
      <TextFieldCust 
        label="Antal dagar" 
        field="days" 
        value={days ?? ""} 
        onChange={(e) => {
          const v = parseInt(e.target.value);
          if (isNaN(v)) {
            setDays(undefined);
          } else {
            setDays(v);
          }
        }} 
      />
      <FormControlLabel 
        control={
        <Checkbox 
          field="scouting" 
          checked={scouting} 
          onChange={() => {
            setScouting((v) => !v);
          }}
        />} 
        label="Scoutkår" 
      />
      
      <div style={{whiteSpace: "nowrap", fontSize: "20px"}}>
        Pris: {price} kr
      </div>
    </FormContainer>
  );
};
