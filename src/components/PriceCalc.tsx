import { useMemo, useState } from "react";
import TextField from "./form/TextField";
import Checkbox from "./form/Checkbox";

const MIN_PERSONS = 16;
const PRICE_DAY = 90;
const PRICE_SCOUTING_DAY = 75;

export default function PriceCalc() {
  const [persons, setPersons] = useState<number | undefined>();
  const [days, setDays] = useState<number | undefined>();
  const [scouting, setScouting] = useState(false);
  // TODO: Vintertillägg (15 % under vintermånaderna)

  const price = useMemo(() => {
    if (days && persons) {
      const priceOneDay =
        Math.max(MIN_PERSONS, persons) *
        (scouting ? PRICE_SCOUTING_DAY : PRICE_DAY);
      return priceOneDay * days;
    }
    return "-";
  }, [persons, days, scouting]);

  const parse = (raw: string) => {
    const parsed = parseInt(raw);
    return isNaN(parsed) ? undefined : parsed;
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className="flex max-w-[700px] flex-col items-start gap-4 sm:flex-row sm:items-end"
    >
      <TextField
        label="Antal personer"
        name="count"
        value={persons !== undefined ? String(persons) : ""}
        onChange={(event) => setPersons(parse(event.target.value))}
      />
      <TextField
        label="Antal dagar"
        name="days"
        value={days !== undefined ? String(days) : ""}
        onChange={(event) => setDays(parse(event.target.value))}
      />
      <div className="shrink-0 sm:pb-2">
        <Checkbox
          label="Scoutkår"
          name="scouting"
          checked={scouting}
          onChange={setScouting}
        />
      </div>

      <div className="whitespace-nowrap text-xl sm:pb-2">Pris: {price} kr</div>
    </form>
  );
}
