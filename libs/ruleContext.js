import { createContext, useState } from 'react';

export const ruleContext = createContext({ viewDetail: null, color: null });

export default function RuleProvider({ children }) {
  const [viewDetail, setViewDetail] = useState(-1);
  const [color, setColor] = useState(
    Math.floor(Math.random() * 16777215).toString(16)
  );

  return (
    <ruleContext.Provider value={{ viewDetail, color }}>
      {children}
    </ruleContext.Provider>
  );
}
