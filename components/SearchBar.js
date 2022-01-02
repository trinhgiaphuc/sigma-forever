export default function SearchBar() {
  return (
    <div className="flex flex-col gap-10">
      <input
        placeholder="Grind the search bar"
        type="text"
        className="w-3/4 mx-auto py-2 px-3 outline-none bg-transparent border-2 border-b-stone-600"
      />

      <div className="flex flex-wrap gap-2 items-center justify-center">
        <button className="text-xs p-2">#Trending</button>
        <button className="text-xs p-2">#Legacy</button>
        <button className="text-xs p-2">#Family</button>
        <button className="text-xs p-2">#Grinding</button>
        <button className="text-xs p-2">#Alo</button>
        <button className="text-xs p-2">#Top50</button>
      </div>
    </div>
  );
}
