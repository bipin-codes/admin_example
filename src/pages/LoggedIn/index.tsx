import { useAppDispatch } from 'app/hooks';
import { login } from 'app/slices/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(
            window.location.hash.substring(1)
        );
        const queryToken = urlParams.get('access_token')!;
        console.log(queryToken);
        if (queryToken) dispatch(login({ userToken: queryToken }));
        navigate('/dashboard');
    });
    return <div>index</div>;
};

export default LoggedIn;
