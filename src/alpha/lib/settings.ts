import { useEffect, useState } from "react";

export type Location = {
  id: string;
  /** Short label used on selection buttons */
  shortName: string;
  /** Full venue name used inside invitations */
  name: string;
  /** Area / neighbourhood, e.g. "Al Garhoud" */
  area: string;
  /** Room details, e.g. "Ballroom, Level B2" */
  room: string;
  mapsUrl: string;
  isPrimary: boolean;
};

export type Settings = {
  courseName: string;
  season: string;
  tagline: string;
  startDate: string;
  endDate: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  /** Exact one-line date string shown in invitations */
  dateLine: string;
  /** Exact one-line time string shown in invitations */
  timeLine: string;
  sessionCount: string;
  cost: string;
  food: string;
  churchName: string;
  churchWebsite: string;
  alphaInfoUrl: string;
  contactEmail: string;
  contactEmailSecondary: string;
  registrationUrl: string;
  locations: Location[];
};

export const defaultSettings: Settings = {
  courseName: "Alpha",
  season: "Fall 2026",
  tagline: "A Seat Saved for You",
  startDate: "September 13, 2026",
  endDate: "December 6, 2026",
  dayOfWeek: "Sundays",
  startTime: "2:30 PM",
  endTime: "4:30 PM",
  dateLine: "Sundays, September 13–December 6, 2026",
  timeLine: "2:30–4:30 PM, Dubai time",
  sessionCount: "",
  cost: "",
  food: "",
  churchName: "Fellowship",
  churchWebsite: "https://fellowshipdubai.com",
  alphaInfoUrl: "https://fellowshipdubai.com/alpha/",
  contactEmail: "joyce@fellowshipdubai.com",
  contactEmailSecondary: "hi@xerxesduane.com",
  registrationUrl: "https://fellowshipdubai.churchcenter.com/people/forms/1263633",
  locations: [
    {
      id: "creekside",
      shortName: "Creekside Hotel",
      name: "Creekside Hotel, Dubai",
      area: "Al Garhoud",
      room: "Ballroom, Level B2",
      mapsUrl: "https://maps.app.goo.gl/NzAuXuDrREigGAs69",
      isPrimary: true,
    },
    {
      id: "jw-marriott-marina",
      shortName: "JW Marriott Marina",
      name: "JW Marriott Marina",
      area: "",
      room: "Ballroom, Level 4",
      mapsUrl: "https://maps.app.goo.gl/dckeWUZaNZ7zy7DG8",
      isPrimary: false,
    },
  ],
};

const KEY = "alpha:settings:v1";
const EVENT = "alpha:settings-changed";

/** Fields whose stored values were written for an older course and must be refreshed. */
const COURSE_FIELDS: (keyof Settings)[] = [
  "season", "startDate", "endDate", "dayOfWeek", "startTime", "endTime",
  "dateLine", "timeLine", "sessionCount", "cost", "food", "registrationUrl",
];
const MIGRATION_KEY = "alpha:settings:migrated:fall2026";

function read(): Settings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    const merged: Settings = { ...defaultSettings, ...parsed };

    // One-time upgrade: stored values from a previous course are replaced.
    if (!localStorage.getItem(MIGRATION_KEY)) {
      for (const f of COURSE_FIELDS) (merged as Record<string, unknown>)[f] = defaultSettings[f];
      merged.locations = defaultSettings.locations;
      localStorage.setItem(MIGRATION_KEY, "1");
    }

    // One-time upgrade: Xerxes' contact email changed.
    const EMAIL_MIGRATION_KEY = "alpha:settings:migrated:xerxes-email";
    if (!localStorage.getItem(EMAIL_MIGRATION_KEY)) {
      merged.contactEmailSecondary = defaultSettings.contactEmailSecondary;
      localStorage.setItem(EMAIL_MIGRATION_KEY, "1");
    }

    localStorage.setItem(KEY, JSON.stringify(merged));
    return merged;

    const locs: Location[] = Array.isArray(parsed.locations) ? parsed.locations : [];
    // Older saved venues had no room details; fall back to the current defaults.
    merged.locations = locs.length && locs.every((l) => l && typeof l.room === "string")
      ? locs
      : defaultSettings.locations;
    return merged;
  } catch {
    return defaultSettings;
  }
}

export function writeSettings(s: Settings) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  localStorage.setItem(MIGRATION_KEY, "1");
  window.dispatchEvent(new Event(EVENT));
}

export function resetSettings() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  localStorage.setItem(MIGRATION_KEY, "1");
  window.dispatchEvent(new Event(EVENT));
}

export function useSettings(): Settings {
  const [s, setS] = useState<Settings>(defaultSettings);
  useEffect(() => {
    setS(read());
    const sync = () => setS(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return s;
}

export function primaryLocation(s: Settings): Location {
  return s.locations.find((l) => l.isPrimary) ?? s.locations[0] ?? {
    id: "", shortName: "", name: "", area: "", room: "", mapsUrl: "", isPrimary: true,
  };
}

export function locationById(s: Settings, id: string | null): Location | null {
  if (!id) return null;
  return s.locations.find((l) => l.id === id) ?? null;
}

/** "Creekside Hotel, Dubai, Al Garhoud" */
export function venueLine(l: Location): string {
  return [l.name, l.area].filter(Boolean).join(", ");
}

const OPENING =
  "Hi! Would you like to join me at Alpha at Fellowship? It's a welcoming space to explore the Christian faith and life's questions. No pressure, no judgment, just honest conversation.";

const CLOSING = "Would you like to come with me?";

function registerBlock(s: Settings): string {
  return s.registrationUrl ? `Register here:\n${s.registrationUrl}\n\n` : "";
}

/** Invitation for one venue. */
export function buildLocationInvite(s: Settings, l: Location, personalNote = ""): string {
  const note = personalNote.trim() ? `${personalNote.trim()}\n\n` : "";
  return `${note}${OPENING}

📍 ${venueLine(l)}${l.room ? `\n${l.room}` : ""}
📅 ${s.dateLine}
🕝 ${s.timeLine}

${registerBlock(s)}${CLOSING}`;
}

/** Invitation that lists every venue. */
export function buildBothInvite(s: Settings, personalNote = ""): string {
  const note = personalNote.trim() ? `${personalNote.trim()}\n\n` : "";
  const venues = s.locations
    .map((l) => `📍 ${venueLine(l)}${l.room ? `\n${l.room}` : ""}`)
    .join("\n\n");
  return `${note}${OPENING}

You can join at either location:

${venues}

Both locations follow the same schedule:
📅 ${s.dateLine}
🕝 ${s.timeLine}

${registerBlock(s)}${CLOSING}`;
}

export const FOLLOW_UP_TEXT =
  "Hi! Just checking whether you'd like to join me at Alpha. Happy to answer any questions, no pressure.";

/** Legacy helper kept for screens that show a generic invite. */
export function buildInviteText(s: Settings): string {
  return buildLocationInvite(s, primaryLocation(s));
}

// Resolve [PLACEHOLDER] tokens in any string against current Settings.
// Tokens are case-insensitive. Unknown tokens are left untouched.
export function applyPlaceholders(text: string, s: Settings): string {
  if (!text) return text;
  const loc = primaryLocation(s);
  const map: Record<string, string> = {
    COURSE: s.courseName,
    COURSENAME: s.courseName,
    SEASON: s.season,
    TAGLINE: s.tagline,
    STARTDATE: s.startDate,
    ENDDATE: s.endDate,
    DATE: s.startDate,
    DATES: s.dateLine,
    DAY: s.dayOfWeek,
    STARTTIME: s.startTime,
    ENDTIME: s.endTime,
    TIME: s.timeLine,
    END: s.endDate,
    SESSIONS: s.sessionCount,
    COST: s.cost,
    FOOD: s.food,
    CHURCH: s.churchName,
    VENUE: venueLine(loc),
    ROOM: loc.room,
    LOCATION: venueLine(loc),
    MAPS: loc.mapsUrl,
    REGISTER: s.registrationUrl,
    EMAIL: s.contactEmail,
    EMAIL2: s.contactEmailSecondary,
    WEBSITE: s.churchWebsite,
  };
  return text.replace(/\[([A-Z_]+)\]/gi, (m, key: string) => {
    const v = map[key.toUpperCase()];
    return v !== undefined && v !== "" ? v : m;
  });
}
