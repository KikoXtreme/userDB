// import { UserInterface } from "../Users/Users";

// interface Props {
//     user: UserInterface;
// }

const Posts = ({ post }: any) => {
    const { title, body } = post;

    console.log('title', title);
    console.log('body', body);

    return (
        <div className="card">
            <p>{title}</p>
            <p>{body}</p>
        </div>
    )
}

export default Posts;