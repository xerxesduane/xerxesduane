import { ArrowLeft, ArrowUpRight, Newspaper } from "lucide-react";
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

      <PanelBoard cols="lg:grid-cols-3">
        {INSIGHTS.map((post) => (
          <Panel key={post.slug} href={`/insights/${post.slug}`} icon={Newspaper}>
            <div className="flex items-center gap-2 font-technical text-[0.68rem] text-fg-faint">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
              {post.title}
            </h2>
            <p className="flex-1 text-sm leading-snug text-fg-soft">{post.description}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 font-technical text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent">
              Read
              <ArrowUpRight size={13} strokeWidth={2.4} aria-hidden />
            </span>
          </Panel>
        ))}
      </PanelBoard>
    </>
  );
}
