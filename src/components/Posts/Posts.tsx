import { IPosts } from "../User/User";

interface PostProps {
    post: IPosts;
}

const Posts = ({ post }: PostProps) => {
    const { title, body } = post;

    console.log('title', title);
    console.log('body', body);

    return (
        <div className="postcard">
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    )
}

export default Posts;