import React, { FC } from "react";
import Post from "./post/post";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../validators/validators";
import { createField, Input } from "../fromsControl/formsconstrol";
import { PostsType } from "../redux/profileReducer"
type PropsType = {
    posts: Array<PostsType>
    addPost: (postText: string) => void
}

const MyPosts: FC<PropsType> = React.memo(({ posts, addPost }) => {
    const postComp = posts.map(post => <Post key={post.id} message={post.message} likeCount={post.likesCount} />)

    const onButtonClick = (value: AddPostFormType) => {
        addPost(value.addNewPost);


    };
    return (
        <div>
            <div>My posts</div>
            <AddPostReduxForm onSubmit={onButtonClick} />
            {postComp}
        </div>
    );
});

type AddPostFormType = {
    addNewPost: string
}
type AddPostFormTypeKeys = Extract<keyof AddPostFormType, string>

const AddPostForm: FC<InjectedFormProps<AddPostFormType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<AddPostFormTypeKeys>('whats new?', 'addNewPost', [required], Input, { type: 'text' })}
            <button >Добавить</button>
        </form>
    )
}
const AddPostReduxForm = reduxForm<AddPostFormType>({ form: 'addPostForm' })(AddPostForm)

export default MyPosts;
