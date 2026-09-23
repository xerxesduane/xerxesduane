import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, Church, MapPin } from "lucide-react";
import PageHeader from "../components/page/PageHeader";
import TabbedViews from "../components/page/TabbedViews";
import { GhostAction, PrimaryAction } from "../components/page/PageActions";
import { CONTACT } from "../data/content";

/**
 * `/ministry` — church and ministry background. UNLISTED on purpose.
 *
 * Reachable by anyone with the link, but kept out of search and AI answers:
 * noindex/nosnippet in the head (src/lib/seo.ts), an X-Robots-Tag header
 * (vercel.json), a Disallow for AI crawlers (public/robots.txt), no sitemap
 * entry, and no internal link or site-assistant route pointing at it. Do not
 * link to it from the nav or any other page, and do not give it JSON-LD.
 */

const mail = (subject: string) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

const linkCls = "inline-flex items-center gap-1 text-accent underline-offset-2 hover:underline";

function Ext({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      className={linkCls}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
    >
      {children}
      <ArrowUpRight size={13} strokeWidth={2.3} aria-hidden />
    </a>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-line bg-panel p-4 shadow-card sm:p-5 ${className}`}>
      {children}
    </div>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-xl font-bold text-fg">{children}</h2>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-[1.05rem] font-bold text-fg">{children}</h3>;
}

const prose = "max-w-[72ch] space-y-3 text-[0.95rem] leading-relaxed text-fg-soft";

const STATS = [
  "7+ years in ministry",
  "~2,000 youths & students trained",
  "5,000+ leaders equipped for digital outreach",
  "Indigitous #HACK Champion",
  "4th Lausanne Congress, 2024",
];

const FOCUS = [
  {
    title: "Digital presence",
    body: "Websites and content that help your ministry be found, understood, and trusted.",
  },
  {
    title: "Story & social",
    body: "Films and social media that carry your message with clarity and heart.",
  },
  {
    title: "Online discipleship",
    body: "Tools and pathways that help people take a real next step in faith.",
  },
];

const MILESTONES = [
  {
    title: "Indigitous #HACK",
    body: "Champion in 2023 and a coach in 2024. Through it I was nominated to the Fourth Lausanne Congress in Seoul (2024), and have since been selected for the Young Leaders Gathering in 2027.",
  },
  {
    title: "Cru Digital Strategies",
    body: "As a volunteer, I helped train more than 5,000 leaders across five denominations in the Philippines, supporting them as they launched digital outreach.",
  },
  {
    title: "The Discovery Bible (HELPS Ministries)",
    body: "As an ambassador, I taught and coached pastors, churches, and denominations in this exegetical study tool: theological and pastoral training, not only software.",
  },
  {
    title: "Ratio Christi",
    body: "Built an e-learning platform that let their professors teach and disciple learners remotely.",
  },
  {
    title: "Films and digital infrastructure",
    body: "Produced a fundraising film that helped fund a church-planting building in Batanes, and built websites and digital systems for denominations and local city churches.",
  },
];

const TOPICS = [
  "Digital ministry & online discipleship",
  "Disciple-making in everyday life",
  "Youth & leadership development",
  "Faith, work & technology",
];

const PLACES: { name: string; year: string; href?: string }[] = [
  { name: "Digital Outreach, Greater Manila Conference, Norzagaray, Bulacan", year: "2024" },
  { name: "Digital discipleship training, Hosanna Christian Church, Phayao, Thailand", year: "2024" },
  { name: "Capital City Alliance Church", year: "2023" },
  {
    name: "57th CAMACOP General Assembly",
    year: "2023",
    href: "https://www.youtube.com/watch?v=kJLqJkvmCpQ",
  },
  { name: "Digital outreach, Alliance Bible Christian Church, Olongapo", year: "2023" },
  {
    name: "Youth Alive Connected, Luzon Youth Camp, Tarlac",
    year: "2023",
    href: "https://www.youtube.com/watch?v=T6zOJ0IFC8k",
  },
  {
    name: "Youth camp, Calintaan Evangelical Youth Churches Association, Mindoro Occidental",
    year: "2023",
    href: "https://www.youtube.com/watch?v=SySRiLbAHVw",
  },
  { name: "The Discovery Bible Project, Bradford United Church of Christ, Cebu", year: "2023" },
  { name: "Capital City Alliance Church youth camp", year: "2023" },
  { name: "Sharing the Discovery Bible Project, Cebu", year: "2023" },
  { name: "Digital outreach, Bradford United Church of Christ, Cebu", year: "2023" },
];

const SERMONS = [
  {
    title: "God's Fatherly Heart",
    date: "June 18, 2023",
    href: "https://www.youtube.com/watch?v=cc8OsK9mCH0",
    where: "YouTube",
  },
  {
    title: "All New",
    date: "December 21, 2022",
    href: "https://www.facebook.com/share/v/18hHG3TpFx/",
    where: "Facebook",
  },
  {
    title: "Happiness or Joy? Choose Joy.",
    date: "April 22, 2022",
    href: "https://www.facebook.com/share/v/1bZCDGyGmq/",
    where: "Facebook",
  },
];

const OUTREACH = [
  "Sharing the gospel among unreached communities in the southern Philippines",
  "Lanna Christian School, a ministry among the Thai",
  "Church building project in Batanes",
  "Church vision film in Pampanga",
  "Teaching video with The Discovery Bible",
];

const DIGITAL_WORK = [
  {
    title: "A digital front door for Alpha",
    body: "A warm, seeker-friendly invitation page that helps people take a first step toward an Alpha course.",
  },
  {
    title: "A mobilization app for Alpha leaders",
    body: "A simple tool that helps leaders run Alpha themselves, not only facilitate it.",
  },
  {
    title: "E-learning platforms for discipleship",
    body: "Built so a local church could keep discipling through the pandemic, and so an apologetics ministry could teach learners remotely.",
  },
  {
    title: "A fundraising film",
    body: "Helped fund a church-planting building in Batanes.",
  },
  {
    title: "Websites and digital systems",
    body: "For denominations and local city churches, helping them be found and followed up with online.",
  },
];

const COLLABORATIONS = [
  {
    title: "Christian-Muslim Dialogue",
    body: "A one-month intensive with the Silsilah Dialogue Movement in Zamboanga, alongside Catholic priests and nuns, Muslim teachers, campus Catholic ministers, and seminarians.",
    href: "https://silsilahdialogue.com/38th-silsilah-summer-course-on-muslim-christian-dialogue/",
  },
  {
    title: "4th Lausanne Congress",
    body: "A gathering of 5,000+ global church leaders collaborating to fulfil the Great Commission together. Through it, I was later selected for the Young Leaders Gathering in 2027.",
    href: "https://congress.lausanne.org/",
  },
  {
    title: "Indigitous #HACK",
    body: "A global Christian hackathon. Champion in 2023 and a coach in 2024.",
    href: "https://hack.indigitous.org/",
  },
  {
    title: "The Innovation Launchpad",
    body: "Training in how to think and work as an innovator.",
    href: "https://www.theinnovationlaunchpad.com/",
  },
];

const SERVE = [
  {
    title: "Preaching & speaking",
    body: "Invite me to open God's Word at your church, youth gathering, conference, or event. I love preaching that helps people meet Jesus and respond to Him honestly.",
  },
  {
    title: "Training & workshops",
    body: "Hands-on training in digital and online ministry for your team, leaders, or youth: digital tools for evangelism and discipleship, social media and storytelling, a warm digital front door for seekers, and disciple-making in everyday life. People often leave having built something real in the room.",
  },
  {
    title: "Digital strategy & build",
    body: "A digital ministry strategy for your church or organization, then the build: websites, online presence, content systems, e-learning and discipleship platforms, and clear pathways to welcome and follow up with people.",
  },
  {
    title: "Coaching & collaboration",
    body: "I can coach your leaders to run Alpha or disciple their friends and workmates themselves, or we can simply build something together.",
  },
];

export default function Ministry() {
  return (
    <>
      <PageHeader
        eyebrow="Ministry"
        icon={Church}
        title="Making disciples in a digital age."
        lede="I help churches, youth ministries, and nonprofits meet people where they already are, online, and walk with them toward Jesus. My work lives where faith, missions, and technology meet."
        meta={
          <>
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={14} strokeWidth={2.2} aria-hidden className="text-accent" />
              Apprentice, Fellowship Dubai · Dubai, UAE
            </span>
          </>
        }
        actions={
          <>
            <PrimaryAction href={mail("Serving together")}>Work with me</PrimaryAction>
            <GhostAction href="/" icon={<ArrowLeft size={15} strokeWidth={2.2} aria-hidden />}>
              Home
            </GhostAction>
          </>
        }
      />

      <ul className="mb-3 flex flex-wrap gap-2">
        {STATS.map((s) => (
          <li
            key={s}
            className="rounded-full border border-line bg-panel px-3 py-1.5 text-[0.85rem] text-fg-soft shadow-card"
          >
            {s}
          </li>
        ))}
      </ul>

      <TabbedViews
        className="mt-3 board:mt-2"
        label="Ministry background"
        views={[
          {
            id: "about",
            label: "About",
            content: (
              <div className="space-y-3">
                <Card>
                  <div className={prose}>
                    <H2>For King and Kingdom</H2>
                    <p className="font-display italic text-fg">
                      Resolved: to live in a way that consistently reflects King Jesus&rsquo; beauty
                      and excellence in every part of life.
                    </p>
                    <p>
                      I&rsquo;m Xerxes Duane Magdaluyo, a Filipino minister serving in Dubai, with a
                      heart for faith, missions, and technology. I grew up in a church-school
                      community in Las Piñas, came to a clear call to full-time ministry at 21, and
                      had that call set on fire by a mission trip to Myanmar and a growing burden for
                      people who have never heard the gospel.
                    </p>
                    <p>
                      Over the last seven-plus years I&rsquo;ve worked mostly with the young:
                      developing youth, training leaders, and helping students grow into people who
                      can disciple others. Across camps, conferences, and campuses, I&rsquo;ve had the
                      joy of training around 2,000 youths and students, and of watching many of them
                      begin to lead on their own.
                    </p>
                    <p>
                      Alongside that, I kept finding myself at the meeting point of ministry and
                      technology. During the pandemic I served as a digital-ministry pastor in a
                      local Christian and Missionary Alliance church, building an e-learning platform
                      so discipleship could continue when gatherings could not. That season clarified
                      a conviction I still hold: the tools of our age are meant to serve the mission
                      of God.
                    </p>
                    <p>
                      Today I serve as an apprentice with{" "}
                      <Ext href="https://fellowshipdubai.com/">Fellowship Dubai</Ext>, coordinating
                      Alpha and discipleship across the church, coaching leaders to run Alpha
                      themselves, and helping with the church&rsquo;s communications and digital
                      outreach. I co-lead Alpha Youth Lab, equipping teenagers and university
                      students to run Alpha Youth for their own friends, and I help lead FaithTech
                      Dubai, a community of Christians working at the intersection of faith and
                      technology.
                    </p>
                  </div>
                </Card>

                <ul className="grid gap-2 sm:grid-cols-3">
                  {FOCUS.map((f) => (
                    <li key={f.title}>
                      <Card className="h-full">
                        <H3>{f.title}</H3>
                        <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">{f.body}</p>
                      </Card>
                    </li>
                  ))}
                </ul>

                <Card>
                  <H2>Along the way</H2>
                  <ul className="mt-3 space-y-3">
                    {MILESTONES.map((m) => (
                      <li key={m.title} className="text-[0.95rem] leading-relaxed text-fg-soft">
                        <strong className="font-bold text-fg">{m.title}.</strong> {m.body}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-[72ch] text-[0.95rem] leading-relaxed text-fg-soft">
                    Beyond ministry and technology, I love telling stories through film and media,
                    and using creativity to carry the gospel further. My prayer is simple: that God
                    would use ordinary faithfulness for extraordinary purposes, among the many
                    nations He has gathered here in the Middle East.
                  </p>
                </Card>
              </div>
            ),
          },
          {
            id: "calling",
            label: "Calling",
            content: (
              <Card>
                <div className={prose}>
                  <H2>My call to missions in the Middle East</H2>
                  <p>
                    My call to missions in the Middle East was clarified and confirmed at the{" "}
                    <Ext href="https://congress.lausanne.org/">4th Lausanne Congress</Ext>.
                    Surrounded by global leaders, missionaries, and church planters, I sensed God
                    press a deep conviction on my heart: the nations are not far away. They are
                    already gathered here.
                  </p>
                  <p>
                    In that space of prayer, worship, and listening, I felt a clear invitation from
                    the Lord to serve among the nations in the Middle East: walking with seekers,
                    discipling new believers, and helping local churches steward the harvest God is
                    bringing. It was not a moment of emotion but of alignment, where calling,
                    burden, and obedience met.
                  </p>

                  <H3>How God led me to Dubai</H3>
                  <p>
                    I was honestly overwhelmed when the invitation came to attend the 4th Lausanne
                    Congress onsite. I was only beginning in ministry, with little to show next to
                    many who would be there, and the cost was high: over USD 2,000. In the
                    beginning, the doubt was very real.
                  </p>
                  <p>
                    After prayer, my parents&rsquo; wise counsel, and the encouragement of my
                    community, I took a step of faith. I paid the USD 100 reservation and trusted
                    God with the rest. Not long after, an email from Lausanne told me everything was
                    fully covered. It was a clear reminder that when God calls, He also provides.
                  </p>
                  <p>
                    Out of more than 5,000 people at the Congress, I met Pastor Bhaveshkumar Nagda,
                    and that one encounter opened doors I could never have planned. Pastor Bhavesh
                    turned out to be my fiancée&rsquo;s teacher in Tribes and Mission, and through
                    him I was connected to pastors serving in Dubai. Those relationships eventually
                    led me to Pastor Bill Koogler of Fellowship Dubai.
                  </p>
                  <p>
                    At the same time, God was shaping my personal life. I married my wife, Loraine,
                    on December 18, 2024, and we began preparing for a new season together. After
                    the Congress I moved to Dubai, found work, and served there for about ten
                    months. In May 2025, Pastor Bill invited me to apply as an apprentice at
                    Fellowship Dubai, and in September 2025 I was officially hired.
                  </p>
                  <p>
                    Looking back, what first felt like an impossible invitation became the doorway
                    God used to lead me into missions in the Middle East. From faith, to provision,
                    to relationships, to calling, every step was clearly His. This conviction
                    continues to shape how I live and serve in Dubai today, trusting God to use
                    ordinary faithfulness for extraordinary purposes.
                  </p>
                </div>
              </Card>
            ),
          },
          {
            id: "talks",
            label: "Talks",
            content: (
              <div className="space-y-3">
                <Card>
                  <div className={prose}>
                    <p>
                      I speak and lead training on digital ministry, discipleship, and missions, for
                      churches, youth camps, and conferences across the Philippines, the Gulf, and
                      beyond. Beyond the stage, much of my work is hands-on: coaching leaders and
                      students to run Alpha and Alpha Youth themselves, helping churches disciple
                      people in everyday life, and equipping believers to use digital tools for
                      ministry.
                    </p>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-[0.85rem] text-fg-soft"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </Card>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Card>
                    <H3>Movement Day Middle East · 2026</H3>
                    <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">
                      A workshop on FaithTech and discipleship through sports, exploring how
                      technology and sport can open everyday doors for the gospel across the region.
                    </p>
                    <p className="mt-2 text-[0.9rem]">
                      <Ext href="https://youtu.be/pNR2HftvTbA">Watch on YouTube</Ext>
                    </p>
                  </Card>
                  <Card>
                    <H3>FaithTech Dubai workshop · 2026</H3>
                    <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">
                      A practical session on personal branding and building websites with AI tools,
                      where participants built and launched real sites in the room.
                    </p>
                    <blockquote className="mt-2 border-l-2 border-accent/60 pl-3 text-[0.9rem] italic leading-snug text-fg">
                      &ldquo;An impactful session on personal branding and building websites with AI
                      tools. I was able to build and host my website during the session itself.&rdquo;
                      <footer className="mt-1 not-italic text-fg-faint">
                        FaithTech Dubai participant ·{" "}
                        <Ext href="https://chidigfx.com">chidigfx.com</Ext>
                      </footer>
                    </blockquote>
                  </Card>
                  <Card>
                    <H3>Apologetics for youth · 2022</H3>
                    <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">
                      Teaching young people to be Christian thinkers and lovers, so that when the
                      world tells them lies, they can answer with truth and with love, in the power
                      of the Spirit. Five questions: What is absolutely true? What is our identity
                      and purpose? Where can we find our confidence? Who transforms us? How can we
                      share the gospel in the digital world?
                    </p>
                    <p className="mt-2 text-[0.9rem]">
                      <Ext href="https://www.facebook.com/share/v/17RCB3mMw6/">Watch on Facebook</Ext>
                    </p>
                  </Card>
                  <Card>
                    <H3>Practical Ways for a Better Sermon · 2022</H3>
                    <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">
                      A workshop helping preachers grow in their craft, with brothers and sisters
                      from Capiz Alliance Fellowship, Bethel Alliance Community, and Roxas City
                      Alliance Church.
                    </p>
                  </Card>
                </div>

                <Card>
                  <H2>More places I&rsquo;ve served</H2>
                  <ul className="mt-3 divide-y divide-line">
                    {PLACES.map((p) => (
                      <li
                        key={p.name}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2 text-[0.9rem] text-fg-soft"
                      >
                        <span>
                          {p.name} <span className="text-fg-faint">· {p.year}</span>
                        </span>
                        {p.href && <Ext href={p.href}>Watch</Ext>}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ),
          },
          {
            id: "sermons-worship",
            label: "Worship",
            content: (
              <div className="grid gap-3 board:grid-cols-2">
                <Card>
                  <div className={prose}>
                    <H2>Sermons</H2>
                    <p>
                      Preaching is a sacred trust. I&rsquo;ve had the privilege of opening
                      God&rsquo;s Word in local churches, youth gatherings, and the seminary pulpit,
                      including the Calintaan Evangelical Youth Churches Association (2023) and the
                      Philippine Baptist Theological Seminary (2020).
                    </p>
                  </div>
                  <ul className="mt-3 divide-y divide-line">
                    {SERMONS.map((s) => (
                      <li
                        key={s.title}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2 text-[0.9rem] text-fg-soft"
                      >
                        <span>
                          <strong className="font-bold text-fg">{s.title}</strong>{" "}
                          <span className="text-fg-faint">· {s.date}</span>
                        </span>
                        <Ext href={s.href}>Watch on {s.where}</Ext>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card>
                  <div className={prose}>
                    <H2>Worship</H2>
                    <p>
                      Worship leading has been part of my ministry for years, from churches in the
                      Philippines to the nations gathered here in the UAE. These days I have the joy
                      of helping lead worship in a multicultural Fellowship Dubai church plant in
                      Sharjah, where people from many languages and backgrounds lift one song to God.
                      Whatever the room, my heart is the same: to help people meet Jesus and respond
                      to Him honestly.
                    </p>
                    <ul className="space-y-1">
                      <li>Fellowship Sharjah, United Arab Emirates · 2026</li>
                      <li>Capital City Alliance Church · 2023</li>
                      <li>Angeles City Alliance Church · 2022</li>
                    </ul>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            id: "projects",
            label: "Projects",
            content: (
              <div className="space-y-3">
                <Card>
                  <div className={prose}>
                    <H2>Ministry projects</H2>
                    <p>
                      A few of the ministries and tools I&rsquo;ve had a hand in, from on-the-ground
                      outreach to films, websites, and discipleship platforms built to help the
                      church reach people.
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                      {OUTREACH.map((o) => (
                        <li key={o}>{o}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
                <ul className="grid gap-2 sm:grid-cols-2 board:grid-cols-3">
                  {DIGITAL_WORK.map((d) => (
                    <li key={d.title}>
                      <Card className="h-full">
                        <H3>{d.title}</H3>
                        <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">{d.body}</p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            id: "training",
            label: "Training",
            content: (
              <div className="space-y-3">
                <Card>
                  <div className={prose}>
                    <H2>Bible resources</H2>
                    <p>
                      Since 2020 I&rsquo;ve taught and represented{" "}
                      <Ext href="https://discoverybible.com/">The Discovery Bible</Ext>, an
                      exegetical study tool that opens up the emphasis and nuance of the original
                      Greek and Hebrew, helping everyday readers study Scripture more closely. As an
                      ambassador, I&rsquo;ve trained pastors, churches, and denominations to use it:
                      the software itself, and the careful, prayerful study behind it.
                    </p>
                    <p>
                      <Ext href={mail("The Discovery Bible intro or training")}>
                        Ask me for an intro or training
                      </Ext>
                    </p>
                  </div>
                </Card>
                <H2>Training & collaboration</H2>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {COLLABORATIONS.map((c) => (
                    <li key={c.title}>
                      <Card className="h-full">
                        <H3>{c.title}</H3>
                        <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">{c.body}</p>
                        <p className="mt-2 text-[0.9rem]">
                          <Ext href={c.href}>Learn more</Ext>
                        </p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            id: "partner",
            label: "Partner",
            content: (
              <div className="space-y-3">
                <Card>
                  <div className={prose}>
                    <H2>Partner & pray</H2>
                    <p>
                      The best of ministry is never done alone. Whether you lead a church, a youth
                      ministry, a campus, or an organization, I&rsquo;d love to serve alongside you,
                      and to have you pray alongside me. This is an invitation into koinonia,
                      partnership in the gospel, where we carry the mission together.
                    </p>
                    <H3>Pray with me</H3>
                    <p>
                      Prayer is not the lesser way to partner. It is full partnership, and I treasure
                      it just as much as any other.
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Pray for the people I walk with as they meet Jesus</li>
                      <li>Pray for leaders and students learning to disciple others</li>
                      <li>Pray for wisdom, protection, and joy for me and my family</li>
                    </ul>
                    <p>
                      <Ext href={mail("I will pray with you")}>I&rsquo;ll commit to pray</Ext>
                    </p>
                  </div>
                </Card>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {SERVE.map((s) => (
                    <li key={s.title}>
                      <Card className="h-full">
                        <H3>{s.title}</H3>
                        <p className="mt-1 text-[0.9rem] leading-snug text-fg-soft">{s.body}</p>
                      </Card>
                    </li>
                  ))}
                </ul>

                <Card>
                  <div className={prose}>
                    <p>
                      In person here in the UAE, or online with churches and teams anywhere.{" "}
                      <Ext href={mail("Serving together")}>Let&rsquo;s talk</Ext>
                    </p>
                    <H3>Support the wider work</H3>
                    <p>
                      Some partners also help sustain the ministry financially, which frees me to
                      serve churches and leaders who could not otherwise bring me in. If you&rsquo;d
                      like to give, monthly or one time, I would be grateful.
                    </p>
                    <p>
                      <Ext href={mail("Partnering financially")}>Partner financially</Ext>
                    </p>
                    <p className="text-fg-faint">
                      A note to my kababayan, and to anyone supporting family back home: please feel
                      no pressure to give. If your hands are full caring for those you love, your
                      prayers are full partnership, and they mean the world to me.
                    </p>
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
