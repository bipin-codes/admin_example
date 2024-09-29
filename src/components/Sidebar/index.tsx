import NavItem from './NavItem';
import { LinkDetail } from './NavItem/types';

const home: LinkDetail = { label: 'home', to: '/dashboard', icon: 'Home' };
const links: Array<LinkDetail> = [
    { label: 'create', to: 'create', icon: 'Blog' },
    { label: 'blogs', to: 'blogs', icon: 'List' },
    { label: 'categories', to: 'categories', icon: 'Categories' },
    { label: 'comments', to: 'comments', icon: 'Comment' },
];

const Sidebar = () => {
    return (
        <nav className="flex flex-col rounded-lg max-w-sm bg-gray-800 text-gray-100 p-10">
            <NavItem item={home} hoverEffect={false} icon="Home" key={'home'} />

            <div className="flex-1 rounded-lg">
                {links.map((link, index) => (
                    <NavItem
                        item={link}
                        hoverEffect={true}
                        key={index}
                        icon={link.icon}
                    />
                ))}
            </div>
        </nav>
    );
};
export default Sidebar;
