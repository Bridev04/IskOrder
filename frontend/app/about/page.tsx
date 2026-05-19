const helpItems = [
  "Browse nearby campus kiosks",
  "View available menu items",
  "Order meals ahead of time",
  "Choose a preferred pickup schedule",
  "Track order status in real time",
  "Avoid long waiting lines",
  "Plan meals around class and work schedules",
];

const team = [
  {
    name: "Ramos, Kim Alecxsis",
    role: "Project Manager / UI/UX Designer",
    image: "/images/team/kim.jpg",
    initials: "KR",
  },
  {
    name: "Mariano, Aryanna Louise",
    role: "Quality Assurance Tester",
    initials: "AM",
  },
  {
    name: "Konno, Salina",
    role: "Quality Assurance Tester",
    image: "/images/team/salina.jpg",
    initials: "SK",
  },
  {
    name: "Kho, Will Ivenson",
    role: "Project Developer / Engineer",
    initials: "WK",
  },
  {
    name: "De Lugar, Davy",
    role: "Business Analyst",
    initials: "DD",
  },
  {
    name: "Rhey Joseph S. Daway",
    role: "Project Consultant / Adviser",
    image: "/images/team/rheyjoseph.jpg",
    initials: "RD",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <section
        className="relative isolate flex min-h-[72vh] items-end bg-ink bg-cover bg-center px-4 pb-14 pt-28 text-white sm:px-6 lg:px-8"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(24, 22, 18, 0.82) 0%, rgba(24, 22, 18, 0.48) 56%, rgba(24, 22, 18, 0.22) 100%), linear-gradient(180deg, rgba(24, 22, 18, 0.12) 0%, rgba(24, 22, 18, 0.72) 100%), url('/images/about-hero.jpg')",
        }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="font-black uppercase tracking-[0.2em] text-gold">About IskOrder</p>
          <h1 className="font-display mt-4 max-w-4xl text-6xl leading-none text-white sm:text-7xl">
            Built to Beat the Campus Rush
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-white/88">
            A real-time food ordering and digital menu platform designed for UP students
            and teachers who want a faster and more convenient way to order food from
            campus kiosks.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <aside className="h-fit rounded-lg border border-maroon/10 bg-white p-6 shadow-sm">
          <p className="font-display text-3xl leading-none text-maroon">Mission</p>
          <p className="mt-3 text-sm leading-6 text-ink/68">
            To help UP students and teachers save time by providing a faster, easier, and
            more organized way to order food from campus kiosks.
          </p>

          <div className="mt-8 border-t border-maroon/10 pt-6">
            <p className="font-display text-3xl leading-none text-maroon">Vision</p>
            <p className="mt-3 text-sm leading-6 text-ink/68">
              To create a reliable campus food ordering platform that reduces waiting time,
              improves order tracking, and makes daily meal access more convenient for
              students and teachers.
            </p>
          </div>

          <div className="mt-8 border-t border-maroon/10 pt-6">
            <h2 className="font-display text-4xl leading-none text-maroon">Meet the Team</h2>

            <div className="mt-5 space-y-3">
              {team.map((member) => (
                <article
                  key={member.name}
                  className="grid grid-cols-[72px_1fr] items-center gap-4 rounded-lg border border-maroon/10 bg-paper p-3 shadow-sm"
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="aspect-square w-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="grid aspect-square w-full place-items-center rounded-md bg-cream">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-maroon text-sm font-black text-gold">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-black leading-tight text-maroon">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-ink/65">
                      {member.role}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>

        <div className="space-y-10">
          <div className="rounded-lg border border-maroon/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-5xl leading-none text-maroon">What We Do</h2>
            <div className="mt-5 space-y-5 text-base leading-8 text-ink/72">
              <p>
                During busy hours, food stalls around campus often have long lines, making
                it difficult for students and teachers to buy meals between classes,
                meetings, and academic work. IskOrder helps reduce this waiting time by
                allowing users to browse available kiosks, view menus, place orders ahead,
                choose pickup times, and track their orders in real time.
              </p>
              <p>
                With IskOrder, students and teachers can check which kiosks are open, see
                available food items, and order before arriving at the stall. This makes the
                food ordering process more organized, saves time, and helps users plan their
                meals around their school schedule.
              </p>
              <p>
                The main objective of IskOrder is to turn long waiting lines into a faster
                and smoother pickup experience. By helping students and teachers order
                ahead, the platform supports a more efficient, convenient, and
                campus-friendly food system.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-maroon/10 bg-white p-6 shadow-sm">
              <h2 className="font-display text-4xl leading-none text-maroon">
                What IskOrder Helps With
              </h2>
              <ul className="mt-5 space-y-3 text-sm font-semibold leading-6 text-ink/72">
                {helpItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-gold-dark" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-maroon/10 bg-forest p-6 text-white shadow-sm">
              <h2 className="font-display text-4xl leading-none">Why IskOrder Matters</h2>
              <div className="mt-5 space-y-5 text-sm leading-7 text-white/82">
                <p>
                  Students and teachers often have limited time during the day. Long food
                  lines can take away time that could be used for studying, teaching,
                  resting, or preparing for the next class. IskOrder helps make food
                  ordering less stressful by giving users more control over when and where
                  they get their meals.
                </p>
                <p>
                  Instead of waiting in line without knowing how long an order will take,
                  students and teachers can order early, monitor their order status, and
                  pick up their food once it is ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
