import { useState } from "react";
import { UserInterface } from "../Users/Users";
import "./User.css"
import Posts from "../Posts/Posts";

interface Props {
    user: UserInterface;
}

export interface IPosts {
    title: string;
    body: string;
}

const User = ({ user }: Props) => {
    const { id, name, username, email, address, phone, website } = user;
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [showPosts, setShowPosts] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [webSite, setWebSite] = useState(website);
    const [userName, setUserName] = useState(username);

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

    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts);
    };

    return (
        <div className="card">
            <h3>{name}</h3>
            <span>Username: </span><input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <p>Email: {email}</p>
            <p>Street: {address.street}</p>
            <p>Suite: {address.suite}</p>
            <p>City: {address.city}</p>
            <span>Phone: </span><input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            <span>Website: </span><input type="text" value={webSite} onChange={(e) => setWebSite(e.target.value)} />
            <button className="button" onClick={() => {
                showPosts ? setPosts([]) : getUsersPosts(id)
                togglePosts();
            }}>
                {showPosts ? "Hide user's posts" : "Get user's posts"}
            </button>
            {posts && posts.map(post => (
                <Posts post={post} />
            ))}
        </div>
    )
}

export default User;