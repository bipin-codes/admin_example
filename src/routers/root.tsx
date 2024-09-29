import App from 'App';
import AuthProvider from 'pages/AuthProvider';
import Dashboard from 'pages/Dashboard';
import Blogs from 'pages/Dashboard/Blogs';
import CreateBlog from 'pages/Dashboard/Blogs/CreateBlog';
import Categories from 'pages/Dashboard/Categories';
import Comments from 'pages/Dashboard/Comments';
import Default from 'pages/Dashboard/Default';

import Error from 'pages/Error';
import LoggedIn from 'pages/LoggedIn';
import { createBrowserRouter } from 'react-router-dom';

const rootRouter = createBrowserRouter([
    { path: '', element: <App />, errorElement: <Error /> },
    { path: 'loggedin', element: <LoggedIn /> },
    {
        path: '/dashboard',
        element: (
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        ),
        children: [
            { index: true, element: <Default /> },
            { path: 'blogs', element: <Blogs /> },
            { path: 'categories', element: <Categories /> },
            { path: 'comments', element: <Comments /> },
            { path: 'create', element: <CreateBlog /> },
            { path: 'edit/:id', element: <CreateBlog /> },
        ],
    },
]);
export default rootRouter;
