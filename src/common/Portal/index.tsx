import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FC<PropsWithChildren<{ isOpen: boolean }>> = ({
    children,
    isOpen,
}) => {
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed top-0 left-0 h-full w-full justify-center items-stretch bg-slate-300 bg-opacity-90 z-10  p-5 bg-gradient-to-tr from-slate-900">
            <div className="flex flex-col p-10 rounded-xl bg-gray-150 gap-y-5 h-full">
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Portal;
