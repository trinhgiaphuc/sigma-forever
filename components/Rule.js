import { Fragment, useContext } from 'react';
import { userContext } from '../libs/userContext/userContext';
import { useRouter } from 'next/router';

import fireoutlineSrc from '@public/fireoutline.png';
import firefilledSrc from '@public/firefilled.png';
import Image from 'next/image';

export default function Rule() {
  const { user } = useContext(userContext);
  const router = useRouter();

  const handleFire = () => {
    if (!user) {
      router.push('/login');
    }
  };

  return (
    <Fragment>
      <button onClick={handleFire} className="block mt-2 ml-auto lg:mr-2">
        <div className="w-9 h-9 relative saturate-200">
          {/* <Image
            src={fireoutlineSrc}
            alt="fire outline icon"
            width={256}
            height={256}
          /> */}
          <Fragment>
            <div className="w-9 h-9 absolute rounded-2xl top-0 left-0 saturate-200 bg-red-500 opacity-30 blur-sm" />
            <Image
              src={firefilledSrc}
              alt="fire filled icon"
              width={256}
              height={256}
            />
          </Fragment>
        </div>
      </button>
      <h2 className="font-medium mb-2 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam mollitia
        rerum corporis aut quod minus, voluptatem amet tempore explicabo ex hic
        eum sequi error rem! Saepe, repudiandae nihil. Repellendus, perferendis?
      </h2>
      <p className="italic my-2 text-right md:mr-2 lg:mr-4">Date~Sigma male</p>
    </Fragment>
  );
}
