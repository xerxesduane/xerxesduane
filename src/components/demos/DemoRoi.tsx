import { useState } from "react";
import { Calculator, Clock, Coins, ArrowRight } from "lucide-react";
import { track } from "../../lib/analytics";

// Client-only — pure arithmetic, no model call, nothing leaves the browser.
// Estimates the time + money tied up in a repeated manual task, and what's
// typically recoverable once it's automated. Everything is clearly an estimate.

const WEEKS_PER_MONTH = 4.33;
// Automation rarely removes 100% of a task (edge cases, oversight). A conservative
// recovery factor keeps the headline honest rather than over-promising.
const RECOVERY = 0.8;

const field =
  "w-full rounded-xl border border-cream/10 bg-ink-deep/50 px-3 py-2.5 text-[15px] text-cream tabular-nums placeholder:text-muted-dark transition-colors focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40";

function aed(n: number): string {
  return "AED " + Math.round(n).toLocaleString("en-AE");
}

function NumberField({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-dark">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Math.max(min, Number(e.target.value)))}
          className={field}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-muted-dark">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

export default function DemoRoi() {
  const [perWeek, setPerWeek] = useState(20);
  const [minutes, setMinutes] = useState(12);
  const [people, setPeople] = useState(2);
  const [rate, setRate] = useState(45);
  const [shown, setShown] = useState(false);

  const hoursMonth = (perWeek * minutes * WEEKS_PER_MONTH * people) / 60;
  const recoverHours = hoursMonth * RECOVERY;
  const recoverMoney = recoverHours * rate;

  function calculate() {
    track("demo_run", { demo: "roi" });
    setShown(true);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Times per week" value={perWeek} onChange={setPerWeek} suffix="×" />
        <NumberField label="Minutes each time" value={minutes} onChange={setMinutes} suffix="min" />
        <NumberField label="People doing it" value={people} onChange={setPeople} min={1} />
        <NumberField label="Hourly cost" value={rate} onChange={setRate} suffix="AED" />
      </div>

      <button
        type="button"
        onClick={calculate}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ink-deep transition duration-300 hover:bg-gold-soft"
      >
        <Calculator size={16} />
        Estimate what's recoverable
      </button>

      {shown && (
        <div role="status" aria-live="polite" className="rounded-2xl border border-cream/10 bg-cream/5 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Clock size={18} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-mono text-3xl text-gold tabular-nums">{Math.round(recoverHours)}</p>
                <p className="text-sm text-cream-dim">hours / month recoverable</p>
                <p className="mt-0.5 text-[11px] text-muted-dark">
                  of ~{Math.round(hoursMonth)} hrs spent on this task now
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Coins size={18} className="mt-1 shrink-0 text-gold" />
              <div>
                <p className="font-mono text-3xl text-gold tabular-nums">{aed(recoverMoney)}</p>
                <p className="text-sm text-cream-dim">/ month back in the team</p>
                <p className="mt-0.5 text-[11px] text-muted-dark">≈ {aed(recoverMoney * 12)} / year</p>
              </div>
            </div>
          </div>
          <p className="mt-4 border-t border-cream/10 pt-3 text-xs text-muted-dark">
            Rough estimate only — it assumes automation handles about {Math.round(RECOVERY * 100)}% of this repetitive
            work. Your real numbers depend on the task; that's exactly what a free audit pins down.
          </p>
          <a
            href="/ai-automation-dubai"
            data-cursor="link"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
          >
            See how I'd automate it
            <ArrowRight size={14} />
          </a>
        </div>
      )}
    </div>
  );
}
