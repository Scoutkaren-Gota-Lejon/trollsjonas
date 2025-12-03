import React, { useState } from "react"
import { makeServerPost } from "../backend-api/utils"
import styled from '@emotion/styled'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import format from 'date-fns/format'
import svLocale from "date-fns/locale/sv";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Checkbox, FormControlLabel } from "@mui/material";

const ErrorContainer = styled.p`
  color: #ff0000;
`

const FormContainer = styled.form`
  border: 0px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
`

const VerticalAlignSpan = styled.span`
  vertical-align: bottom;
  padding-bottom: 10px;
  display: inline-block;
`

const DatePickerWrapper = styled.div`
  width: 150px;
  display: inline-block;
`

const TextFieldCust = ({label, field, type = 'text', fullWidth = true, margin = 'normal'}) => {
  return (
    <>
      <TextField
        label={label}
        placeholder={label}
        name={field}
        type={type}
        fullWidth={fullWidth}
        margin={margin} />
    </>
  )
}

const BokningForm = ({onSubmit, fromDate, handleFromDateChange, toDate, handleToDateChange, kanoter, setKanoter}) => {

  const handleChangeKanoter = (event) => {
    setKanoter(event.target.checked);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={svLocale}>
    <FormContainer onSubmit={(event) => onSubmit(event)} noValidate autoComplete="off">
      <TextFieldCust label="Förening/Organisation" field="organisation" margin="none" />
      <TextFieldCust label="Namn" field="name" />
      <TextFieldCust label="E-post" field="email" type="email" />
      <TextFieldCust label="Telefon" field="phone" type="telephone" />
      <TextFieldCust label="Antal personer" field="antal" />
      <br /><br />
      <div>
        <VerticalAlignSpan>Datum:&nbsp;&nbsp;</VerticalAlignSpan>

        <DatePickerWrapper>
        <DatePicker
            autoOk
            disablePast
            disableToolbar
            variant="inline"
            mask="____-__-__"
            inputFormat="yyyy-MM-dd"
            margin="none"
            label="Från"
            value={fromDate}
            onChange={handleFromDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Välj från',
            }}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </DatePickerWrapper>
        <VerticalAlignSpan>&nbsp;&nbsp;--&nbsp;&nbsp;</VerticalAlignSpan>
        <DatePickerWrapper>
        <DatePicker
          autoOk
          disablePast
          disableToolbar
          minDate={fromDate}
          label="Till"
          mask="____-__-__"
          inputFormat="yyyy-MM-dd"
            value={toDate}
            onChange={handleToDateChange}
            renderInput={(params) => <TextField {...params} size="small" />}
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
      <TextField label="Övrig info/fråga" name="other" multiline minRows={2} fullWidth={true} margin="normal" />

      <br /><br />
      <Button type="submit" variant="contained" color="primary">
        Skicka förfrågan
      </Button>
    </FormContainer>
    </LocalizationProvider>
  )
}

const Boka = () => {
  const [formVisble, setFormVisible] = useState(true);
  const [formError, setFormError] = useState(false);

  const [fromDate, handleFromDateChange] = useState(null);
  const [toDate, handleToDateChange] = useState(null);
  const [kanoter, setKanoter] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormError(false);

    // TODO: Validate input

    const body = {
      'booking': true,
      'name': event.target.name.value,
      'email': event.target.email.value,
      'phone': event.target.phone.value,
      'organisation': event.target.organisation.value,
      'antal': event.target.antal.value,
      'kanoter': kanoter,
      'from': fromDate ? format(fromDate, 'yyyy-MM-dd') : '',
      'to': toDate ? format(toDate, 'yyyy-MM-dd') : '',
      'other': event.target.other.value,
    };

    makeServerPost('booking.php', body).then((resp) => {
      setFormVisible(false);
    }, () => {
      setFormError(true);
    });
  };

  return (
    <div>
      <h2><a name="form" id="form"></a>Bokningsförfrågan</h2>

      {formVisble && <p>Enklast att göra en Bokningsförfrågan är att fylla i formuläret, så återkommer vi så snabbt som möjligt. OBS! Trollsjönäs hyrs inte ut till privatpersoner.</p>}
      {formError && <ErrorContainer>Något gick fel, försök att skicka förfrågan igen.</ErrorContainer>}

      {formVisble && <BokningForm
        onSubmit={onSubmit}
        fromDate={fromDate}
        toDate={toDate}
        handleFromDateChange={handleFromDateChange}
        handleToDateChange={handleToDateChange}
        kanoter={kanoter}
        setKanoter={setKanoter}
        /> }
      {!formVisble && <p>Tack för din förfrågan, vi återkommer så snart vi har kollat om de önskade datumet är ledigt.</p>}
    </div>
  )
}

export default Boka;
