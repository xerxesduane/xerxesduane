import { ArrowLeft } from "lucide-react";
import { INSIGHTS, formatDate } from "../data/insights";
import PageHeader from "../components/page/PageHeader";
import PanelBoard from "../components/page/PanelBoard";
import Panel from "../components/page/Panel";
import { GhostAction } from "../components/page/PageActions";

export default function Insights() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={<>Plain-English answers to real questions.</>}
        lede="Practical thinking on systems, Odoo, automation and growth for small businesses in Dubai and beyond."
        actions={
          <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
            Home
          </GhostAction>
        }
      />

      <PanelBoard cols="board:grid-cols-4">
        {INSIGHTS.map((post) => (
          <Panel key={post.slug} href={`/insights/${post.slug}`}>
            <h2 className="font-display text-[0.95rem] font-semibold leading-snug text-fg transition-colors group-hover:text-accent-deep">
              {post.title}
            </h2>
            <p className="flex items-center gap-2 font-technical text-[0.66rem] text-fg-faint">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min</span>
            </p>
          </Panel>
        ))}
      </PanelBoard>
    </>
  );
}
