import { ErrorMessage } from "@core/components/ErrorMessage";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function getOrderError({
  handleClose,
  title,
  message,
}: {
  handleClose: () => void;
  title: string;
  message: string;
}) {
  return (
    <div className="flex items-stretch grow flex-col">
      <div className="modal-header flex justify-end ">
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-black p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-gray-400 dark:hover:text-white"
        >
          <XMarkIcon className="size-5" />
        </button>
      </div>
      <div className="grow">
        <ErrorMessage title={title} message={message} />
      </div>
    </div>
  );
}
