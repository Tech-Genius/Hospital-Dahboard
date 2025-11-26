import React, { type ReactNode } from 'react';

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string; 
}

const RightDrawer: React.FC<RightDrawerProps> = ({ isOpen, onClose, children, widthClass = 'w-96' }) => {
  return (
    <>
 
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-90 z-30 transition-opacity duration-300"
          onClick={onClose}
        />
      )}


      <div
        className={`fixed top-0 right-0 border border-[#2A2A2A]  h-screen bg-surface-dark shadow-2xl z-40 overflow-y-auto transition-transform duration-300 ease-in-out ${widthClass}
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`
        }
      >
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
};

export default RightDrawer;