export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Terms</p>
      <h1 className="font-display mt-2 text-5xl leading-none text-maroon sm:text-6xl">
        Terms and pickup disclaimer
      </h1>

      <div className="mt-8 space-y-5 rounded-lg bg-white p-6 leading-7 text-ink/70 shadow-sm ring-1 ring-maroon/10">
        <section>
          <h2 className="font-display text-4xl leading-none text-maroon">Student responsibility</h2>
          <p className="mt-2">
            Students are responsible for arriving at the selected pickup schedule. If a student
            arrives late and the food is no longer hot, it is not the store's fault.
          </p>
        </section>

        <section>
          <h2 className="font-display text-4xl leading-none text-maroon">Reheating requests</h2>
          <p className="mt-2">
            A student may ask the store to reheat food after a late pickup, but reheating is not
            mandatory for staff or store owners.
          </p>
        </section>

        <section>
          <h2 className="font-display text-4xl leading-none text-maroon">Order timing</h2>
          <p className="mt-2">
            Pickup times and preparation estimates are guidance for the demo flow. Kiosks may
            update delays through notifications.
          </p>
        </section>
      </div>
    </div>
  );
}
