import Rule from './Rule';

export default function RuleList() {
  return (
    <ul className="flex flex-col gap-5 font-ibm p-2">
      <li className="p-2 bg-orange-100 rounded tracking-wide border shadow-md md:text-xl lg:text-2xl">
        <Rule />
      </li>
      <li className="p-2 bg-orange-100 rounded tracking-wide border shadow-md md:text-xl lg:text-2xl">
        <Rule />
      </li>
      <li className="p-2 bg-orange-100 rounded tracking-wide border shadow-md md:text-xl lg:text-2xl">
        <Rule />
      </li>
      <li className="p-2 bg-orange-100 rounded tracking-wide border shadow-md md:text-xl lg:text-2xl">
        <Rule />
      </li>
    </ul>
  );
}
