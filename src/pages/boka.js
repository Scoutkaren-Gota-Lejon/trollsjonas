import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { makeServerPost } from "../api/utils"
import styled from "styled-components"

const ErrorContainer = styled.p`
  color: #ff0000;
`

const TextField = ({label, field, type = 'text'}) => {
  return (
    <div>
      <label htmlFor={`input-${field}`}>{label}</label><br />
      <input type={type} name={field} id={`input-${field}`} />
    </div>
  )
}

const TextArea = ({label, field}) => {
  return (
    <div>
      <label htmlFor={`input-${field}`}>{label}</label><br />
      <textarea name={field} id={`input-${field}`}></textarea>
    </div>
  )
}

const BokningForm = ({onSubmit}) => {

  const [disabled, setDisabled] = useState(true);

  const setGdpr = (event) => {
    setDisabled(!event.target.checked)
  }

  return (
    <form method="post" onSubmit={(event) => onSubmit(event)}>
      <TextField label="Namn" field="name" />
      <TextField label="E-post" field="email" type="email" />
      <TextField label="Telefon" field="phone" type="telephone" />
      <TextField label="Organisation" field="organisation" />
      <TextField label="Från" field="from" type="date" />
      <TextField label="Till" field="to" type="date" />

      <TextArea label="Övrig info/fråga" field="other" />

      <div>
        <input type="checkbox" name="gdpr" id={`input-gdpr`} onChange={setGdpr} />
        <label htmlFor={`input-gdpr`}>Godkänner att Stiftelsen lagrar och använder mina personuppgifter.</label>

      </div>

      <button type="submit" disabled={disabled}>Skicka</button>
    </form>
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
