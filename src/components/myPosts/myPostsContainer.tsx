
import { addPost, PostsType } from "../redux/profileReducer";
import MyPosts from "./myPosts";
import { connect } from "react-redux";
import { AppStateType } from "../redux/store-redux";

type MapStateType = {
    posts: Array<PostsType>
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        posts: state.profilePage.posts
    }
}

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts);
export default MyPostsContainer;
