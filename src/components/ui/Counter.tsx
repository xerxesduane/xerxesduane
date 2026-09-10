interface CounterProps { value: number; suffix?: string; duration?: number; }
/** Keep factual values consistent in prerendered HTML and the hydrated page. */
export default function Counter({ value, suffix = "" }: CounterProps) {
  return <span className="tabular-nums">{value}{suffix}</span>;
}
