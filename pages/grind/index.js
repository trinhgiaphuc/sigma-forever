export default function Grind() {
  return (
    <div className="container mx-auto">
      <form className="flex flex-col mx-2">
        <label className="label mt-4" htmlFor="rule">
          rule:
        </label>
        <textarea
          className="input-form"
          placeholder="What do you want to grind today, my Sigma brother?"
          name="rule"
          rows={5}
          id="rule"
        />
        <label className="label mt-3" htmlFor="rule-number">
          number:
        </label>
        <input
          className="input-form"
          placeholder="#rule-number"
          type="text"
          id="rule-number"
        />
        <label className="label mt-3" htmlFor="author">
          author:
        </label>
        <input
          className="input-form"
          placeholder="Sigma Sign"
          type="text"
          id="author"
        />
        <button className="p-2 mt-6 border border-black rounded bg-orange-400">
          Submit
        </button>
      </form>
    </div>
  );
}
