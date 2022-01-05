import spinnerUrl from '@public/Spinner.svg';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="w-28 mx-auto sm:w-40">
      <Image src={spinnerUrl} alt="loading icon" width={200} height={200} />
    </div>
  );
}
