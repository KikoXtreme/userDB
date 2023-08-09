import { PostProps } from "../../interfaces/interfaces";
// import { useSelector } from "../../store";

const Posts = ({ post }: PostProps) => {
    const { title, body } = post;

    // const { posts } = useSelector((state) => state.users) as { posts: IPosts[] };;

    return (
        <div className="postcard">
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
        // <div>
        //     {/* <h4>{title}</h4>
        //     <p>{body}</p> */}
        //     {posts.map((post) => (
        //         <div className="postcard" key={post.id}>
        //             <h4>{post.title}</h4>
        //             <p>{post.body}</p>
        //         </div>
        //     ))}
        // </div>
    );
};

export default Posts;