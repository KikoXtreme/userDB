import { useState } from "react";
import "./User.css"
import Posts from "../Posts/Posts";
import { IPosts, Props } from "../../interfaces/interfaces";
import { useSelector } from "../../store";

const User = ({ user }: Props) => {
    const { id, name, username, email, address, phone, website } = user;
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [showPosts, setShowPosts] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const [nameOfTheUser, setNameOfTheUser] = useState(name);
    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [webSite, setWebSite] = useState(website);
    const [userName, setUserName] = useState(username);
    const [userEmail, setUserEmail] = useState(email);
    const [street, setStreet] = useState(address.street);
    const [suite, setSuite] = useState(address.suite);
    const [city, setCity] = useState(address.city);

    const { users } = useSelector((state) => state.users);
    console.log('users', users);

    const getUsersPosts = async (id: number) => {
        // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         setPosts(data);
        //     });
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    }

    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts);
    };

    return (
        <div className="card">
            <button className="collapsible-button" onClick={() => setIsCollapsed(!isCollapsed)}>
                {isCollapsed ? 'Show User' : 'Hide User\'s Info'}
            </button>
            {!isCollapsed && (
                <form>
                    <label htmlFor="name">Name:</label>
                    <input type="text" value={nameOfTheUser} name="name" onChange={(e) => setNameOfTheUser(e.target.value)} />

                    <label htmlFor="username">Username:</label>
                    <input type="text" value={userName} name="username" onChange={(e) => setUserName(e.target.value)} />

                    <label htmlFor="email">Email:</label>
                    <input type="text" value={userEmail} name="email" onChange={(e) => setUserEmail(e.target.value)} />

                    <label htmlFor="street">Street:</label>
                    <input type="text" value={street} name="street" onChange={(e) => setStreet(e.target.value)} />

                    <label htmlFor="suite">Suite:</label>
                    <input type="text" value={suite} name="suite" onChange={(e) => setSuite(e.target.value)} />

                    <label htmlFor="city">City:</label>
                    <input type="text" value={city} name="city" onChange={(e) => setCity(e.target.value)} />

                    <label htmlFor="phone">Phone:</label>
                    <input type="text" value={phoneNumber} name="phone" onChange={(e) => setPhoneNumber(e.target.value)} />

                    <label htmlFor="website">Website:</label>
                    <input type="text" value={webSite} name="website" onChange={(e) => setWebSite(e.target.value)} />
                    {/* <button type="submit">Submit</button> */}
                </form>
            )}
            <button className="button" onClick={() => {
                showPosts ? setPosts([]) : getUsersPosts(id)
                togglePosts();
            }}>
                {showPosts ? "Hide user's posts" : "Get user's posts"}
            </button>
            {posts && posts.map(post => (
                <Posts key={post.id} post={post} />
            ))}
        </div>
    );
};

export default User;