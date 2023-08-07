import { useState } from "react";
import { UserInterface } from "../Users/Users";
import "./User.css"
import Posts from "../Posts/Posts";

interface Props {
    user: UserInterface;
}

const User = ({ user }: Props) => {
    const { id, username, email, address, phone, website } = user;
    const [posts, setPosts] = useState([]);

    const getUsersPosts = async (id: number) => {
        //     fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        // .then(res => res.json())
        // .then(data => {
        //     setPosts(data);
        // });
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    }
    // console.log(user.id);
    // console.log('posts: ', posts);

    return (
        <div className="card">
            <h3>{username}</h3>
            <p>Email: {email}</p>
            <p>Street: {address.street}</p>
            <p>Suite: {address.suite}</p>
            <p>City: {address.city}</p>
            <p>Phone: {phone}</p>
            <p>Website: {website}</p>
            <button className="button" onClick={() => getUsersPosts(id)}>Get user's posts'</button>
            {posts && posts.map(post => (
                <Posts post={post} />
            ))}
        </div>
    )
}

export default User;