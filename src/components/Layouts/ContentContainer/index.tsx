import React, { PropsWithChildren } from 'react';

const ContentContainer: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="flex-1 flex flex-col">{children}</div>;
};

export default ContentContainer;
