/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import Link from "next/link";

interface IAuthModalProps {
  openAuthModal: boolean;
  setOpenAuthModal: (open: boolean) => void;
}

const AuthModal = ({ openAuthModal, setOpenAuthModal }: IAuthModalProps) => {
  return (
    <div className="mx-auto flex w-72 items-center justify-center">
      {openAuthModal && (
        <div
          className={`fixed z-[100] flex items-center justify-center ${
            openAuthModal ? "opacity-1 visible" : "invisible opacity-0"
          } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
          role="button"
          tabIndex={0}
          onClick={() => setOpenAuthModal(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              setOpenAuthModal(false);
            }
          }}
        >
          <div
            aria-modal="true"
            className="absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl opacity-1 translate-y-0 duration-300"
            role="dialog"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
              }
            }}
          >
            <div className="flex flex-col items-center justify-center space-y-4">
              <svg
                className="w-16 stroke-primary"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7.75V13"
                  opacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 16.2002V16.3002"
                  opacity="0.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              <h6 className="text-center text-sm font-medium opacity-70">
                Please login to post travel stories & tips!
              </h6>
              <div className="flex gap-2">
                <Link href={"/login"}>
                  <button className="rounded-md bg-primary px-6 py-2 text-sm text-white">
                    Login
                  </button>
                </Link>
                <button
                  className="rounded-md border border-gray-600 px-6 py-2 text-sm text-gray-600 hover:bg-rose-600 hover:text-white"
                  onClick={() => setOpenAuthModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthModal;
