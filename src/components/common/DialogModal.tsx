import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

export interface DialogModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  description?: string;
  onConfirm: () => void;
}

function DialogModal({ isOpen, setIsOpen, title, description, onConfirm } : DialogModalProps) {
  if (!isOpen) return null;

  const confirmClick = () => {
    setIsOpen(false);
    onConfirm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
            {title && <h2 className={`${description ? 'text-xl font-semibold' : 'font-normal text-lg mb-11 mt-3 text-center'} text-black900 mb-4`}>{title}</h2>}
            {description && (
              <p className="texl-xl font-PTDMedium text-black500 mt-4 mb-7 leading-7 whitespace-pre-line">
                {description}
              </p>
            )}
            <div className="flex gap-5 w-full mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="text-black900 text-sm w-full rounded-xl h-[50px] border-black300 border-[1px] hover:border-0 hover:bg-primary hover:text-white duration-300 ease-in-out transition-all"
              >
                아니오
              </button>
              <button
                onClick={confirmClick}
                className="text-black900 text-sm w-full rounded-xl h-[50px] border-black300 border-[1px] hover:border-0 hover:bg-primary hover:text-white duration-300 ease-in-out transition-all"
              >
                예
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DialogModal;
