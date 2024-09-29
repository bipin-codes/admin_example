import { useAppSelector } from 'app/hooks';
import { accessToken } from 'app/slices/auth';
import { useValidateTokenQuery } from 'app/slices/auth/api';
import Loader from 'components/Loader';
import React, { PropsWithChildren, useEffect } from 'react';

const url_dev = `${import.meta.env.VITE_COGNITO_DOMAIN_DEV}?client_id=${
    import.meta.env.VITE_CLIENT_ID_DEV
}&response_type=token&redirect_uri=${import.meta.env.VITE_REDIRECT_URL_DEV}`;

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const token = useAppSelector(accessToken);
    const { isLoading } = useValidateTokenQuery();

    useEffect(() => {
        if (!token) window.location.replace(url_dev);
    }, [token]);

    if (isLoading) return <Loader isFullScreen />;

    return <>{children}</>;
};

export default AuthProvider;
