import CategoriesSelector, { Option } from 'common/CategoriesSelector';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import {
    useCreateBlogMutation,
    useCreatePresignUrlsMutation,
    useGetBlogsQuery,
    useUpdateBlogMutation,
} from 'app/slices/blogs/api';

import { toast } from 'react-toastify';
import LinkItem from 'common/LinkItem';
import {
    extractBase64ImagesAndSequence,
    getImagesAsFiles,
    quillModules,
    uploadAllFiles,
} from './helper';
import Loader from 'components/Loader';
import { useParams } from 'react-router-dom';

Quill.register('modules/imageResize', ImageResize);

const CreateBlog = () => {
    const { id } = useParams();
    const { data: blogToEdit } = useGetBlogsQuery(
        {},
        {
            selectFromResult: ({ data }) => {
                return { data: data?.body.data.find((blog) => blog.id === id) };
            },
        }
    );
    const isEditing = blogToEdit ? true : false;
    const quillRef = useRef<ReactQuill | null>(null);

    const [editorState, setEditorState] = useState<string>(
        isEditing ? blogToEdit!.content : ''
    );

    const [blogTitle, setBlogTitle] = useState<string>(
        isEditing ? blogToEdit!.title : ''
    );

    const [categories, setCategories] = useState<Array<string>>(
        isEditing ? blogToEdit!.categories : []
    );
    const [linkValue, setLinkValue] = useState('');
    const [links, setLinks] = useState<Array<string>>(
        isEditing ? blogToEdit!.additionalLinks ?? [] : []
    );

    const [fetchPresignedURLs] = useCreatePresignUrlsMutation();

    const [
        createBlog,
        { isLoading: isCreatingBlog, isSuccess: isBlogCreated },
    ] = useCreateBlogMutation();

    const [updateBlog, { isLoading: isUpdatingBlog }] = useUpdateBlogMutation();

    const onFilterCategorySelected = (options: Option[]) => {
        setCategories([...options.map((option) => option.value)]);
    };

    const onEditorChangeHandler = (value: string) => {
        setEditorState(value);
    };

    // #region LINK HANDLERS
    const onAddLinkHandler = () => {
        if (links.findIndex((x) => x === linkValue) !== -1) {
            toast('Link already exists!');
            return;
        }
        setLinks([...links, linkValue]);
        setLinkValue('');
    };

    const onDeleteLinkHandler = (item: string) => {
        const toDelete = item as string;
        setLinks([...links.filter((x) => x !== toDelete)]);
    };

    const onEditLinkHandler = (oldVal: string, newVal: string) => {
        const updated = links.map((link) => {
            return link === oldVal ? newVal : link;
        });

        setLinks([...updated]);
    };

    const resetBlogData = () => {
        setEditorState('');
        setBlogTitle('');
        setLinks([]);
        setLinkValue('');
        setCategories([]);
    };

    const isInvalid = () => {
        return (
            editorState.trim() === '' ||
            categories.length === 0 ||
            blogTitle === ''
        );
    };

    useEffect(() => {
        if (isBlogCreated || !isEditing) resetBlogData();
    }, [isBlogCreated, isEditing]);

    //#endregion
    const onSaveHandler = async () => {
        if (isInvalid()) {
            toast.error('Please complete blog details!');
            return;
        }

        const { base64Images, sequence } =
            extractBase64ImagesAndSequence(editorState);

        const { presignedURLs, urls } = await fetchPresignedURLs({
            images: sequence,
        }).unwrap();

        let files: Blob[] = [];
        if (quillRef.current !== null) {
            files = getImagesAsFiles(
                quillRef.current.getEditor().getContents()
            );
        }

        if (files.length) await uploadAllFiles(files, presignedURLs);

        let updatedEditorState = editorState;
        base64Images.forEach((image, i) => {
            updatedEditorState = updatedEditorState.replace(
                image.base64Rep,
                urls[i]
            );
        });

        if (isEditing) {
            updateBlog({
                title: blogTitle,
                categories,
                additionalLinks: links,
                content: updatedEditorState,
                id: blogToEdit!.id,
                isFeatured: false,
                published: false,
                preSignedURLs: [...blogToEdit!.preSignedURLs, ...urls],
            });
        } else {
            createBlog({
                title: blogTitle,
                categories,
                additionalLinks: links,
                content: updatedEditorState,
                isFeatured: false,
                published: false,
                preSignedURLs: urls,
            });
        }
    };

    return isCreatingBlog || isUpdatingBlog ? (
        <Loader isFullScreen></Loader>
    ) : (
        <div className="flex flex-1 flex-col justify-stretch gap-5 p-5">
            <CategoriesSelector
                placeholderMessage="Select blog categories to filter..."
                allowMultipleValues={true}
                onValueSelected={onFilterCategorySelected}
                values={categories.map((category) => ({
                    value: category,
                    label: category,
                }))}
            />

            <div className="space-x-5">
                <button
                    className="px-3 py-3 rounded-md bg-blue-400"
                    type="button"
                    onClick={onSaveHandler}
                >
                    Save
                </button>
                <button
                    className={`px-3 py-3 rounded-md  ${
                        isEditing ? 'bg-gray-100 static-button' : 'bg-red-400'
                    }`}
                    type="button"
                    onClick={resetBlogData}
                    disabled={isEditing}
                >
                    Clear
                </button>
            </div>
            <div>
                <div className="flex flex-row justify-between items-stretch gap-x-5">
                    <input
                        value={linkValue}
                        onChange={({
                            target,
                        }: ChangeEvent<HTMLInputElement>) => {
                            setLinkValue(target.value);
                        }}
                        className="flex-1 focus:outline-1 focus:outline-none border-gray-200 border-2"
                        placeholder="Link to another article"
                    />
                    <button
                        className="action-button"
                        onClick={onAddLinkHandler}
                    >
                        Add Link
                    </button>
                </div>
                <div className="flex gap-2 mt-2 mb-10 flex-wrap">
                    {links
                        .filter((x) => x !== '')
                        .map((x, idx) => (
                            <LinkItem
                                key={idx}
                                item={x}
                                onDeleteHandler={onDeleteLinkHandler}
                                onEditHandler={onEditLinkHandler}
                            />
                        ))}
                </div>
            </div>
            <div>
                <input
                    className="w-full border-gray-300 border-solid border focus:outline-none"
                    type="text"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setBlogTitle(e.target.value);
                    }}
                    placeholder="Title for the Blog."
                    value={blogTitle}
                />
            </div>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={quillModules}
                onChange={onEditorChangeHandler}
                value={editorState}
            />
        </div>
    );
};

export default CreateBlog;
