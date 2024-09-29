import BlogsList from 'components/BlogsList';
import Icon from 'common/Icon';
import { IBlog } from 'app/slices/blogs/types';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const navigate = useNavigate();

    const onBlogEditHandler = (blog: IBlog) => {
        navigate(`/dashboard/edit/${blog.id}`);
    };

    return (
        <div className="flex-col between p-5 justify-between space-y-5 relative">
            <div className="flex items-stretch flex-1 ">
                <input
                    type="text"
                    placeholder="search blog by title"
                    className="px-6 py-4 rounded-lg bg-gray-200 outline-none flex-1 text-2xl text-gray-800 focus:shadow-md"
                />
                <button className="action-button w-md flex justify-center align-middle ml-5">
                    <Icon name="Search" />
                </button>
            </div>

            <BlogsList onBlogEditHandler={onBlogEditHandler} />
        </div>
    );
};
export default Blogs;
