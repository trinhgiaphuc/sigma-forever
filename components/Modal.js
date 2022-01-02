export default function Modal({ showModal, children }) {
  return (
    <div
      className={`absolute h-screen w-screen bg-neutral-200 opacity-100 z-10 transition-all ease-in-out duration-150 top-0 left-0 grid place-items-center ${
        showModal && 'scale-0'
      }`}
    >
      <div className="w-11/12 flex flex-col text-center gap-5 text-xl text-zinc-700 sm:text-2xl md:text-3xl md:w-2/5">
        {children}
      </div>
    </div>
  );
}
