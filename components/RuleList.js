import Rule from './Rule';

export default function RuleList({ rules, viewDetail, setViewDetail, color }) {
  return (
    <ul className="flex flex-col font-ibm px-2 pb-24 h-full gap-10 lg:pr-10 overflow-y-scroll overflow-x-hidden no-scrollbar">
      {rules.map(rule => (
        <li
          onClick={() => setViewDetail(rule.ruleNumber)}
          key={rule.ruleNumber}
        >
          <Rule rule={rule} viewDetail={viewDetail} />
        </li>
      ))}
    </ul>
  );
}
