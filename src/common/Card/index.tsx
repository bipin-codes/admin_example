import { Link } from 'react-router-dom';
import { ICardDetail } from './types';

const withLink = (component: JSX.Element, link?: string) => {
    if (link) {
        return (
            <Link to={link} target="_blank">
                {component}
            </Link>
        );
    }
    return component;
};

const Card: React.FC<ICardDetail> = ({ title, description, value, link }) => {
    return (
        <div className="group w-3/12 md:8/12">
            <div className="group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-gray-700 duration-200">
                <div className="flex flex-col bg-gray-800 p-10 rounded-lg text-gray-100 space-y-5 h-56">
                    <p className="opacity-50 text-2xl">{title}</p>
                    <div className="opacity-90 space-y-2">
                        {withLink(
                            <p className="text-2xl text-ellipsis font-light">
                                {description}
                            </p>,
                            link
                        )}
                        <p className="text-blue-400 font-bold text-2xl">
                            {value}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
