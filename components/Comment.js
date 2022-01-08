export default function Comment({ key }) {
  return (
    <li
      key={key}
      className="p-2 rounded-md shadow-sm border border-black bg-card-2 shadow-zinc-600"
    >
      <p className="text-xl tracking-wider font-ibm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, corporis
        quasi. Eum tempore maxime unde optio illum dolorum at, asperiores
        deleniti similique perferendis.
      </p>
    </li>
  );
}
