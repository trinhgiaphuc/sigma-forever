import { auth } from '@libs/firebase';

import Router from 'next/router';
import { FaShareSquare } from 'react-icons/fa';

export default function ShareButton() {
  const handleFire = () => {
    if (!auth.currentUser) {
      Router.push('/enter');
    }
  };

  return (
    <button onClick={handleFire} className="rule-btn animate-btn bg-blue-500">
      <div className="w-9 h-9 flex items-center mx-auto justify-center ">
        <FaShareSquare className="text-2xl" />
      </div>
    </button>
  );
}
