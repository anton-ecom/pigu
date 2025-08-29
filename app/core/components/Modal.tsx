import { XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { RemoveScroll } from "react-remove-scroll";

export function Modal({
  children,
  onClose,
  variant,
  from,
}: {
  children: React.ReactNode;
  onClose: () => void;
  variant?: string;
  from?: string;
}) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  return (
    <RemoveScroll allowPinchZoom inert>
      <div className="fixed top-0 z-20 left-0 w-full h-full backdrop-brightness-50 bg-gray-500/50 backdrop-blur-sm dark:bg-black/10" />

      <div
        className={` modal ${variant ? variant : ""}`}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="modal-container z-20">
          <div className="modal-header">
            <div className="flex pr-4 space-x-2 grow items-center">
              {from && (
                <button
                  type="button"
                  onClick={onClose}
                  className="justify-end p-2 rounded-full dark:hover:bg-neutral-700 "
                  aria-label="Go back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                    role="img"
                    aria-labelledby="backButtonTitle"
                  >
                    <title id="backButtonTitle">Go back</title>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              )}

              <div className="text-lg font-semibold">Modal</div>
            </div>

            <div className="items-center hidden space-x-4 md:flex ">
              <div className="cursor-pointer text-secondary hover:text-black dark:hover:text-white">
                Esc
              </div>
              <button
                type="button"
                onClick={onClose}
                className="justify-end p-2 text-gray-500 bg-transparent rounded-full hover:text-black dark:hover:bg-neutral-700 dark:text-neutral-400 dark:hover:text-white"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col items-stretch modal-body">
            {children}
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
}
