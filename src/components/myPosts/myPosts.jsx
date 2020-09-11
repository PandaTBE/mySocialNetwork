import React from "react";
import Post from "./post/post";
import { Field, reduxForm } from "redux-form";
import { required } from "../validators/validators";
import { Input } from "../fromsControl/formsconstrol";



const MyPosts = React.memo((props) => {
    const postComp = props.posts.map(post => <Post key={post.id} message={post.message} likeCount={post.likesCount} />)

    const onButtonClick = (value) => {
        props.addPost(value.addNewPost);


    };
    return (
        <div>
            <div>My posts</div>
            <AddPostReduxForm onSubmit={onButtonClick} />
            {postComp}
        </div>
    );
});

const AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field placeholder="whats new?"
                validate={[required]} name='addNewPost' component={Input} type="text">
            </Field>
            <button >Добавить</button>
        </form>
    )
}
const AddPostReduxForm = reduxForm({ form: 'addPostForm' })(AddPostForm)

export default MyPosts;
