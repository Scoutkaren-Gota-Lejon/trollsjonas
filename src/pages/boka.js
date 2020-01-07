import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeServerPost } from "../api/utils"
import styled from "styled-components"
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const ErrorContainer = styled.p`
  color: #ff0000;
`

const FormContainer = styled.form`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
`

const SwitchContainer = styled.div`
  margin: 15px 0;
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

const BokningForm = ({onSubmit}) => {

  const [disabled, setDisabled] = useState(true);

  const setGdpr = (event) => {
    setDisabled(!event.target.checked)
  }

  return (
    <FormContainer onSubmit={(event) => onSubmit(event)} noValidate autoComplete="off">
      <TextFieldCust label="Förening/Organisation" field="organisation" margin="none" />
      <TextFieldCust label="Namn" field="name" />
      <TextFieldCust label="E-post" field="email" type="email" />
      <TextFieldCust label="Telefon" field="phone" type="telephone" />
      <div style={{verticalAlign: 'bottom'}}>
        Datum:
        <TextFieldCust label="Från" field="from" fullWidth={false} margin="none" /> -
        <TextFieldCust label="Till" field="to" fullWidth={false} margin="none" />
      </div>

      <TextField label="Övrig info/fråga" name="other" multiline  fullWidth={true} margin="normal" />

      <SwitchContainer>
        <FormControlLabel control={
          <Switch value="gdpr" color="primary" onChange={setGdpr} />
          } label="Jag godkänner att Stiftelsen Göta Lejons Friluftsgård lagrar och använder mina personuppgifter." />
      </SwitchContainer>

      <Button type="submit" variant="contained" color="primary" disabled={disabled}>
        Skicka förfrågan
      </Button>
    </FormContainer>
  )
}

export default ({ data }) => {
  const seo = data.seo.frontmatter

  const title = seo.title
  const keywords = seo.keywords ? seo.keywords : []
  const description = seo.description ? seo.description : ""
  const [formVisble, setFormVisible] = useState(true);
  const [formError, setFormError] = useState(false);

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
      'from': event.target.from.value,
      'to': event.target.to.value,
      'other': event.target.other.value,
    };

    makeServerPost('booking.php', body).then((resp) => {
      setFormVisible(false);
    }, () => {
      setFormError(true);
    });
  };

  return (
    <Layout>
      <SEO title={title} keywords={keywords} description={description} />
      <h1>Bokningsförfrågan</h1>

      <p>Kul att du är intresserad av att hyra Trollsjönäs.</p>
      <p>Enklast att göra en Bokningsförfrågan är att fylla i formuläret, så återkommer vi så snabbt som möjligt.</p>
      <p>Det går även att boka genom att kontakta vår uthyrningssamordnare <br />Gert Andersson på <br />mobil: 0733-429732<br /> e-postadress: <a href="mailto:boka@gotalejon.org">boka@gotalejon.org</a></p>

      {formError && <ErrorContainer>Något gick fel, försök att skicka förfrågan igen.</ErrorContainer>}

      {formVisble ? <BokningForm onSubmit={onSubmit} /> : 'Tack för din förfrågan, vi återkommer så snart vi har kollat om de önskade datumet är ledigt.'}
    </Layout>
  )
}

export const query = graphql`
  query {
    seo: markdownRemark(fields: { slug: { eq: "/boka/" } }) {
      frontmatter {
        title
        keywords
        description
      }
    }
  }
`
