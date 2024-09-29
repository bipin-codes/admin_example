import { FC } from 'react';

const Loader: FC<{ isFullScreen: boolean }> = ({ isFullScreen }) => {
    return (
        <div
            className={`flex justify-center items-center bg-white opacity-50 ${
                isFullScreen ? 'absolute h-screen inset-0' : ''
            }`}
        >
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>
    );
};

export default Loader;
