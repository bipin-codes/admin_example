import { useAppDispatch, useAppSelector } from 'app/hooks';
import { allComments, unpublish } from 'app/slices/comments';
import { IComment } from 'app/slices/comments/types';
import Icon from 'common/Icon';

const Comments = () => {
    const comments = useAppSelector(allComments);
    const dispatch = useAppDispatch();

    const onTogglePublish = (comment: IComment) => () => {
        if (
            window.confirm(
                `${
                    comment.published
                        ? 'Unpublish this comment? '
                        : 'Publish this comment?'
                }`
            )
        ) {
            dispatch(unpublish(comment));
        }
    };

    return (
        <div className="flex-col p-5 justify-between  text-gray-500">
            <div className="text-3xl text-gray-500 text-bold underline underline-offset-2">
                List of recent comments
            </div>

            <div className="text-2xl text-gray-500 text-bold mt-10">
                Comments
            </div>
            <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="font-bold shadow-lg p-5 flex justify-between items-center rounded-md"
                    >
                        <div className="font-normal">
                            <p className="text-gray-700 italic font-bold">
                                {comment.content}
                            </p>
                            <p className="text-gray-400">
                                by
                                <span className="text-blue-500 ml-3">
                                    {comment.username}
                                </span>
                            </p>
                        </div>
                        <div className="flex justify-between items-center gap-5">
                            <div
                                className={`rounded-md p-2 border-gray-800 border-1 cursor-pointer hover:scale-105 hover:duration-100 ${
                                    comment.published
                                        ? 'bg-green-400'
                                        : 'bg-yellow-400'
                                }`}
                                onClick={onTogglePublish(comment)}
                            >
                                {comment.published ? (
                                    <Icon name="Published_Filled" size={16} />
                                ) : (
                                    <Icon name="Published_Empty" size={16} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
