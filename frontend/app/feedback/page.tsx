export default function FeedbackPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <p className="font-black uppercase tracking-[0.2em] text-gold-dark">Feedback</p>
      <h1 className="font-display mt-2 text-4xl leading-none text-maroon sm:text-6xl">
        Help improve IskOrder
      </h1>
      <p className="mt-4 text-base leading-7 text-ink/70 sm:text-lg sm:leading-8">
        This form is for app and website feedback, separate from food or kiosk reviews.
      </p>

      <form className="mt-8 rounded-lg bg-white p-4 shadow-sm ring-1 ring-maroon/10 sm:p-6">
        <label className="block">
          <span className="font-bold text-ink">Feedback type</span>
          <select className="mt-2 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon">
            <option>Website experience</option>
            <option>Ordering flow</option>
            <option>Recommendation quality</option>
            <option>Accessibility concern</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="font-bold text-ink">Message</span>
          <textarea
            className="mt-2 min-h-40 w-full rounded-lg border border-maroon/15 bg-cream px-4 py-3 outline-none focus:border-maroon"
            placeholder="Tell us what worked, what felt confusing, or what should be added next."
          />
        </label>

        <button
          type="button"
          className="mt-6 w-full rounded-full bg-maroon px-6 py-3 font-black text-white sm:w-auto"
        >
          Send feedback
        </button>
      </form>
    </div>
  );
}
