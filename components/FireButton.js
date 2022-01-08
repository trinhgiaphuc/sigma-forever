import { auth } from '@libs/firebase';

import Router from 'next/router';
import Image from 'next/image';

import fireoutlineSrc from '@public/fireoutline.png';
import firefilledSrc from '@public/firefilled.png';
import { Fragment } from 'react';

export default function FireButton() {
  const handleFire = () => {
    if (!auth.currentUser) {
      Router.push('/enter');
    }
  };

  return (
    <button onClick={handleFire} className="rule-btn bg-red-500 animate-btn">
      <div className="w-9 h-9 mx-auto saturate-200 brightness-200">
        <Image
          src={fireoutlineSrc}
          alt="fire outline icon"
          width={256}
          height={256}
        />
        {/* <Fragment>
          <div className="w-9 h-9 absolute rounded-2xl top-0 left-0 saturate-200 bg-red-500 opacity-30 blur-sm" />
          <Image
            src={firefilledSrc}
            alt="fire filled icon"
            width={256}
            height={256}
          />
        </Fragment> */}
      </div>
    </button>
  );
}
