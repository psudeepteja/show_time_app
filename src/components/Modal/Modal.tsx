import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; // Define children as ReactNode type
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 p-8">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 bg-white p-6 rounded-lg shadow-lg w-3/4 lg:w-1/2">
        {children}
      </div>
    </div>
  );
};

export default Modal;
