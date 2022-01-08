import { auth } from '@libs/firebase';

import Router from 'next/router';
import { FaRegCommentAlt } from 'react-icons/fa';

export default function CommentButton() {
  const handleFire = () => {
    if (!auth.currentUser) {
      Router.push('/enter');
    }
  };

  return (
    <button onClick={handleFire} className="rule-btn animate-btn bg-green-500">
      <div className="w-9 h-9 flex items-center mx-auto justify-center ">
        <FaRegCommentAlt className="text-2xl" />
      </div>
    </button>
  );
}
