import React, { useState } from "react";
import { makeServerPost } from "../backend-api/utils";
import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";

const ErrorContainer = styled.p`
  color: #ff0000;
`;

const FormContainer = styled.form`
  border: 0px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
`;

const VerticalAlignSpan = styled.span`
  vertical-align: bottom;
  padding-bottom: 10px;
  display: inline-block;
`;

const DatePickerWrapper = styled.div`
  width: 150px;
  display: inline-block;
`;

interface TextFieldCustProps {
  label: string;
  field: string;
  type?: string;
  fullWidth?: boolean;
  margin?: "none" | "normal" | "dense";
  error?: boolean;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextFieldCust = ({
  label,
  field,
  type = "text",
  fullWidth = true,
  margin = "normal",
  error,
  helperText,
  onChange,
}: TextFieldCustProps) => {
  return (
    <>
      <TextField
        label={label}
        placeholder={label}
        name={field}
        type={type}
        fullWidth={fullWidth}
        margin={margin}
        error={error}
        helperText={helperText}
        onChange={onChange}
      />
    </>
  );
};

interface BokningFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  fromDate: Date | null;
  handleFromDateChange: (date: Date | null) => void;
  toDate: Date | null;
  handleToDateChange: (date: Date | null) => void;
  kanoter: boolean;
  setKanoter: (value: boolean) => void;
  emailError: string;
  onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BokningForm = ({
  onSubmit,
  fromDate,
  handleFromDateChange,
  toDate,
  handleToDateChange,
  kanoter,
  setKanoter,
  emailError,
  onEmailChange,
}: BokningFormProps) => {
  const handleChangeKanoter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKanoter(event.target.checked);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sv}>
      <FormContainer
        onSubmit={(event) => onSubmit(event)}
        noValidate
        autoComplete="off"
      >
        <TextFieldCust
          label="Förening/Organisation"
          field="organisation"
          margin="none"
        />
        <TextFieldCust label="Namn" field="name" />
        <TextFieldCust
          label="E-post"
          field="email"
          type="email"
          error={!!emailError}
          helperText={emailError}
          onChange={onEmailChange}
        />
        <TextFieldCust label="Telefon" field="phone" type="telephone" />
        <TextFieldCust label="Antal personer" field="antal" />
        <br />
        <br />
        <div>
          <VerticalAlignSpan>Datum:&nbsp;&nbsp;</VerticalAlignSpan>

          <DatePickerWrapper>
            <DatePicker
              disablePast
              format="yyyy-MM-dd"
              label="Från"
              value={fromDate}
              onChange={handleFromDateChange}
              slotProps={{ textField: { size: "small" } }}
            />
          </DatePickerWrapper>
          <VerticalAlignSpan>&nbsp;&nbsp;--&nbsp;&nbsp;</VerticalAlignSpan>
          <DatePickerWrapper>
            <DatePicker
              disablePast
              minDate={fromDate ?? undefined}
              label="Till"
              format="yyyy-MM-dd"
              value={toDate}
              onChange={handleToDateChange}
              slotProps={{ textField: { size: "small" } }}
            />
          </DatePickerWrapper>
        </div>
        <br />
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={kanoter}
                onChange={handleChangeKanoter}
                name="kanoter"
                color="primary"
              />
            }
            label="Hyra kanoter"
          />
        </div>
        <TextField
          label="Övrig info/fråga"
          name="other"
          multiline
          minRows={2}
          fullWidth={true}
          margin="normal"
        />

        <br />
        <br />
        <Button type="submit" variant="contained" color="primary">
          Skicka förfrågan
        </Button>
      </FormContainer>
    </LocalizationProvider>
  );
};

const Boka = () => {
  const [formVisble, setFormVisible] = useState(true);
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [fromDate, handleFromDateChange] = useState<Date | null>(null);
  const [toDate, handleToDateChange] = useState<Date | null>(null);
  const [kanoter, setKanoter] = useState(false);

  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (emailError && isValidEmail(event.target.value)) {
      setEmailError("");
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(false);
    setEmailError("");

    const target = event.target as HTMLFormElement;

    const email = (target.elements.namedItem("email") as HTMLInputElement)
      .value;
    if (!isValidEmail(email)) {
      setEmailError("Ange en giltig e-postadress");
      return;
    }

    const body = {
      booking: true,
      name: (target.elements.namedItem("name") as HTMLInputElement).value,
      email: (target.elements.namedItem("email") as HTMLInputElement).value,
      phone: (target.elements.namedItem("phone") as HTMLInputElement).value,
      organisation: (
        target.elements.namedItem("organisation") as HTMLInputElement
      ).value,
      antal: (target.elements.namedItem("antal") as HTMLInputElement).value,
      kanoter: kanoter,
      from: fromDate ? format(fromDate, "yyyy-MM-dd") : "",
      to: toDate ? format(toDate, "yyyy-MM-dd") : "",
      other: (target.elements.namedItem("other") as HTMLInputElement).value,
    };

    makeServerPost("booking.php", body).then(
      () => {
        setFormVisible(false);
      },
      () => {
        setFormError(true);
      },
    );
  };

  return (
    <div>
      <h2>
        <a id="form"></a>Bokningsförfrågan
      </h2>

      {formVisble && (
        <p>
          Enklast att göra en Bokningsförfrågan är att fylla i formuläret, så
          återkommer vi så snabbt som möjligt. OBS! Trollsjönäs hyrs inte ut
          till privatpersoner.
        </p>
      )}
      {formError && (
        <ErrorContainer>
          Något gick fel, försök att skicka förfrågan igen.
        </ErrorContainer>
      )}

      {formVisble && (
        <BokningForm
          onSubmit={onSubmit}
          fromDate={fromDate}
          toDate={toDate}
          handleFromDateChange={handleFromDateChange}
          handleToDateChange={handleToDateChange}
          kanoter={kanoter}
          setKanoter={setKanoter}
          emailError={emailError}
          onEmailChange={onEmailChange}
        />
      )}
      {!formVisble && (
        <Alert severity="success" variant="filled" sx={{ mt: 2, mb: 4, maxWidth: 500 }}>
          Tack för din förfrågan! Vi återkommer så snart vi har kollat om de
          önskade datumet är ledigt.
        </Alert>
      )}
    </div>
  );
};

export default Boka;
