import ContentContainer from 'components/Layouts/ContentContainer';
import Sidebar from 'components/Sidebar';
import { CategoriesProvider } from 'context/CategoriesProvider';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    return (
        <div className="h-screen flex p-2 gap-x-2">
            <Sidebar />
            <ContentContainer>
                <CategoriesProvider>
                    <Outlet />
                </CategoriesProvider>
            </ContentContainer>
            <ToastContainer
                icon={false}
                autoClose={1500}
                position="top-right"
                theme="dark"
            />
        </div>
    );
};
export default Dashboard;
