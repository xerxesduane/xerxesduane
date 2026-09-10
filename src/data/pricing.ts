/**
 * How pricing is talked about, in one place.
 *
 * The site used to publish a rate card — "from AED X" on every service card
 * and service page. It came down because a number set before the scope is a
 * guess, and a guess either undersells the work or scares off the job it would
 * have fitted. What replaces it has to say the same thing everywhere it
 * appears, which is why it lives here rather than being retyped per page.
 *
 * `answer` is the long form: the pricing FAQ, the FAQPage schema, and what the
 * site assistant reads off the page when someone asks what things cost.
 */
export const PRICING = {
  /** Where a "from AED X" line used to sit, on a service page header. */
  meta: "Priced to the scope · a fixed proposal after your free audit",
  /** Said once under the services grid, instead of on every card. */
  line: "No rate card here. Every build is different, so the number comes after the scope does.",
  answer:
    "It depends on the build. Scope, integrations and how much you already have running all move the number, so anything published here would be wrong before we started. What you get instead is a written proposal after the free 60-minute audit: real scope, real price, fixed. No guessing games. Want the email to set that call up, or would you rather WhatsApp me?",
};
