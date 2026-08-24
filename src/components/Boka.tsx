import React, { useState } from "react";
import { format } from "date-fns";
import { makeServerPost } from "../backend-api/utils";
import TextField from "./form/TextField";
import Checkbox from "./form/Checkbox";
import DateField from "./form/DateField";

const startOfToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Boka = () => {
  const [formVisible, setFormVisible] = useState(true);
  const [formError, setFormError] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [kanoter, setKanoter] = useState(false);
  const [loadTime] = useState(() => Date.now());

  const onEmailChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (emailError && isValidEmail(event.target.value)) {
      setEmailError("");
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(false);
    setEmailError("");

    const form = event.target as HTMLFormElement;
    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement).value;

    if (!isValidEmail(field("email"))) {
      setEmailError("Ange en giltig e-postadress");
      return;
    }

    const body = {
      booking: true,
      name: field("name"),
      email: field("email"),
      phone: field("phone"),
      organisation: field("organisation"),
      antal: field("antal"),
      kanoter: kanoter,
      from: fromDate ? format(fromDate, "yyyy-MM-dd") : "",
      to: toDate ? format(toDate, "yyyy-MM-dd") : "",
      other: field("other"),
      website: field("website"),
      elapsed_ms: Date.now() - loadTime,
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

      {formVisible && (
        <p>
          Enklast att göra en Bokningsförfrågan är att fylla i formuläret, så
          återkommer vi så snabbt som möjligt. OBS! Trollsjönäs hyrs inte ut
          till privatpersoner.
        </p>
      )}
      {formError && (
        <p className="text-[#ff0000]">
          Något gick fel, försök att skicka förfrågan igen.
        </p>
      )}

      {formVisible && (
        <form
          onSubmit={onSubmit}
          noValidate
          autoComplete="off"
          className="flex max-w-[500px] flex-col gap-4"
        >
          <TextField label="Förening/Organisation" name="organisation" />
          <TextField label="Namn" name="name" />
          <TextField
            label="E-post"
            name="email"
            type="email"
            error={emailError}
            onChange={onEmailChange}
          />
          <TextField label="Telefon" name="phone" type="tel" />
          <TextField label="Antal personer" name="antal" />

          <fieldset className="m-0 border-0 p-0">
            <legend className="mb-1 text-sm font-medium text-neutral-700">
              Datum
            </legend>
            <div className="flex items-end gap-3">
              <DateField
                label="Från"
                name="from"
                value={fromDate}
                onChange={setFromDate}
                minDate={startOfToday()}
              />
              <span className="pb-2">--</span>
              <DateField
                label="Till"
                name="to"
                value={toDate}
                onChange={setToDate}
                minDate={fromDate ?? startOfToday()}
              />
            </div>
          </fieldset>

          <Checkbox
            label="Hyra kanoter"
            name="kanoter"
            checked={kanoter}
            onChange={setKanoter}
          />

          <TextField label="Övrig info/fråga" name="other" multiline rows={2} />

          {/* Honeypot — bots fill this, humans never see it. Paired with the
              elapsed_ms timing check in the payload. */}
          <div
            aria-hidden="true"
            className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </div>

          <div>
            <button
              type="submit"
              className="cursor-pointer rounded bg-[#bc360a] px-5 py-2.5 font-medium
                uppercase tracking-wide text-white transition-colors
                hover:bg-[#ea9629] focus:outline-none focus:ring-2
                focus:ring-[#bc360a] focus:ring-offset-2"
            >
              Skicka förfrågan
            </button>
          </div>
        </form>
      )}
      {!formVisible && (
        <div
          role="alert"
          className="mt-2 mb-8 max-w-[550px] rounded bg-green-700 px-4 py-3 text-white"
        >
          Tack för din förfrågan! <br />
          Vi återkommer så snart vi har kollat om de önskade datumen är lediga.
        </div>
      )}
    </div>
  );
};

export default Boka;
