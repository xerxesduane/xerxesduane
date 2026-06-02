export interface VideoItem {
  /** YouTube video ID */
  id: string;
  title: string;
  tag: string;
}

/** Showreel videos (YouTube). Loaded click-to-play (no cookies until played). */
export const VIDEOS: VideoItem[] = [
  { id: "OBvAXE45BVg", title: "Color Grading", tag: "Technique" },
  { id: "CXqVhRm5x7w", title: "Animation", tag: "Motion" },
  { id: "QEAfldK0FEk", title: "Social Media Reel", tag: "Reel" },
  { id: "jk_HbMZP1Ag", title: "Same Day Production", tag: "Event" },
  { id: "CB4j2pDTZEk", title: "Reformation Conference 2023", tag: "Event" },
  {
    id: "-CH0mfTkfhU",
    title: "Lanna Christian School Graduation 2024 — Phayao, Thailand",
    tag: "Event",
  },
  { id: "xhSudmPb6wg", title: "Tribal New Life Church Missions", tag: "Documentary" },
  {
    id: "lyr5kgvR9gU",
    title: "VFBM Church Building Project — Batanes, Philippines",
    tag: "Documentary",
  },
  { id: "hZvfrwOVRic", title: "Ayangan, Ifugao — Mensaheros", tag: "Documentary" },
  {
    id: "YF4fhBL8xOA",
    title: "Discover MORE about 1 John 1 — Original Language Academy",
    tag: "Educational",
  },
];
