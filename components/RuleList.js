import Rule from './Rule';

export default function RuleList({ rules }) {
  return (
    <ul className="flex flex-col gap-5 font-ibm p-2">
      {rules.map(rule => (
        <li key={rule.ruleNumber} className="rule">
          <Rule rule={rule} />
        </li>
      ))}
    </ul>
  );
}
