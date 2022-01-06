import { userContext } from '@libs/context';
import { useContext, useState } from 'react';

import { auth, db, getRules } from '@libs/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

import LoginRequestButton from '@components/LoginRequestButton';

export async function getServerSideProps(context) {
  const rule = await getRules();

  if (rule.length === 0) return { props: { lastRuleNumber: 0 } };
  return { props: { lastRuleNumber: rule[0].ruleNumber } };
}

export default function AddRulePage({ lastRuleNumber }) {
  const { username } = useContext(userContext);
  const [content, setContent] = useState('');
  const [boxSelected, setBoxSelected] = useState([]);

  const addNewRule = async e => {
    e.preventDefault();
    const { uid } = auth.currentUser;
    const ruleNumber = lastRuleNumber + 1;

    const rulesDoc = doc(db, 'users', uid, 'rules', ruleNumber.toString());

    await setDoc(rulesDoc, {
      ruleNumber,
      hashtag: boxSelected,
      author: username,
      content: e.target.rule.value,
      fire: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    setContent('');
    setBoxSelected([]);
  };

  const handleBoxChecked = value => {
    if (boxSelected.includes(value)) {
      setBoxSelected(boxSelected.filter(element => element !== value));
    } else {
      setBoxSelected([...boxSelected, value]);
    }
  };

  return (
    <div className="h-[95vh] grid place-items-center overflow-scroll">
      <div className="container mx-auto my-3 py-2">
        {username ? (
          <form
            onSubmit={addNewRule}
            className="flex flex-col relative gap-4 mx-2"
          >
            <div className="flex flex-col relative md:flex-row gap-2">
              <input
                id="hashtag"
                placeholder="#hashtag"
                readOnly
                value={[...boxSelected]}
                className="input-form px-5 py-3 bg-zinc-100 outline-none tracking-wide font-ibm italic shadow-md shadow-zinc-400 move-up md:w-[50%]"
                type="text"
              />
              <div className="flex-grow flex items-center justify-evenly flex-wrap sm:flex-nowrap gap-1">
                <CheckBox
                  checked={boxSelected}
                  handleBoxChecked={handleBoxChecked}
                  element="#funny"
                  color="bg-lime-400"
                />
                <CheckBox
                  checked={boxSelected}
                  handleBoxChecked={handleBoxChecked}
                  element="#sad"
                  color="bg-blue-500"
                />
                <CheckBox
                  checked={boxSelected}
                  handleBoxChecked={handleBoxChecked}
                  element="#motivated"
                  color="bg-orange-500"
                />
                <CheckBox
                  checked={boxSelected}
                  handleBoxChecked={handleBoxChecked}
                  element="#dark"
                  color="bg-zinc-600"
                />
                <CheckBox
                  checked={boxSelected}
                  handleBoxChecked={handleBoxChecked}
                  element="#love"
                  color="bg-red-400"
                />
              </div>
            </div>
            <textarea
              onChange={e => setContent(e.target.value)}
              value={content}
              className="input-form h-[45vh] px-5 py-3 font-ibm resize-none bg-zinc-100 outline-none shadow-md shadow-zinc-400"
              placeholder="What do you want to grind today, my Sigma brother?"
              name="rule"
              id="rule"
              maxLength={5000}
            />
            <button className="sm:w-[50%] sm:mx-auto p-6 mb-8 shadow-sm shadow-zinc-400 border font-medium uppercase border-black rounded bg-zinc-100">
              Post
            </button>
          </form>
        ) : (
          <LoginRequestButton>Please login to post rule</LoginRequestButton>
        )}
      </div>
    </div>
  );
}

const CheckBox = ({ element, color, checked, handleBoxChecked }) => {
  return (
    <div className={`${checked.includes(element) && color} border rounded-lg`}>
      <label
        htmlFor={element}
        className="cursor-pointer block p-3 select-none font-medium"
      >
        {element}
      </label>
      <input
        onChange={() => handleBoxChecked(element)}
        className="hidden"
        id={element}
        type="checkbox"
      />
    </div>
  );
};
