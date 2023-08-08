import { PostProps } from "../../interfaces/interfaces";

const Posts = ({ post }: PostProps) => {
    const { title, body } = post;

    return (
        <div className="postcard">
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    );
};

export default Posts;