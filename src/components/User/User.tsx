import { useState } from "react";
import "./User.css"
import Posts from "../Posts/Posts";
import { IPosts, Props, UserInterface } from "../../interfaces/interfaces";
import { dispatch, useSelector } from "../../store";
import { listPosts, listUser, listUsers } from "../../store/reducers/users";

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

    // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         setPosts(data);
    //     });
    const getUsersPosts = async (id: number) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const data = await response.json();
            setPosts(data);
            dispatch(listPosts(data));
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    }

    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts);
    };

    // const addPropertyToUser = () => {
    //     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             id: id,
    //             name: name,
    //             username: username,
    //             email: email,
    //             address: {
    //                 street: address.street,
    //                 suite: address.suite,
    //                 city: address.city,
    //             },
    //             phone: phone,
    //             website: website,
    //             posts: {
    //                 title: 'foooooo',
    //                 body: 'barrrrr',
    //             },
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((json) => console.log(json));
    // }

    const { users } = useSelector((state) => state.users) as { users: UserInterface[] };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                name: nameOfTheUser,
                username: userName,
                email: userEmail,
                address: {
                    street: street,
                    suite: suite,
                    city: city,
                },
                phone: phoneNumber,
                website: webSite
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((updatedData) => {
                console.log('Updated data:', updatedData);
                // dispatch(listUsers(updatedData));
                dispatch(listUser(updatedData));

                const updatedUsers = users.map(user => {
                    if (user.id === updatedData.id) {
                        return updatedData;
                    }
                    return user;
                });
                dispatch(listUsers(updatedUsers));
                console.log('updatedUsers', updatedUsers);
            });
    }

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
                    <button className="submit-button" type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            )}
            <button className="button" onClick={() => {
                showPosts ? setPosts([]) : getUsersPosts(id)
                togglePosts();
                // addPropertyToUser();
            }}>
                {showPosts ? "Hide user's posts" : "Get user's posts"}
            </button>
            {posts && posts.map(post => (
                <Posts key={post.id} post={post} />
            ))}
            {/* {posts && <Posts />} */}
        </div>
    );
};

export default User;