import { useState } from "react";
import Posts from "../Posts/Posts";
import "../../css/userCard.css";
import '../../css/spinner.css';
import { IPosts, Props, UserInterface } from "../../interfaces/interfaces";
import { dispatch, useSelector } from "../../store";
import { listPosts, listUser, listUsers } from "../../store/reducers/users";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = ({ user }: Props) => {
    const { id, name, username, email, address, phone, website } = user;

    const [posts, setPosts] = useState<IPosts[]>([]);
    const [showPosts, setShowPosts] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nameOfTheUser, setNameOfTheUser] = useState(name);
    const [phoneNumber, setPhoneNumber] = useState(phone);
    const [webSite, setWebSite] = useState(website);
    const [userName, setUserName] = useState(username);
    const [userEmail, setUserEmail] = useState(email);
    const [street, setStreet] = useState(address.street);
    const [suite, setSuite] = useState(address.suite);
    const [city, setCity] = useState(address.city);

    const getUsersPosts = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            const data = await response.json();
            setPosts(data);
            dispatch(listPosts(data));
        } catch (error) {
            console.error('Error fetching user\'s posts:', error);
            toast.error('An error occurred while fetching user\'s posts.');
        }
        setIsLoading(false);
    }

    const userPosts = useSelector((state) => state.users.posts) as IPosts[];

    // const addPropertyToUser = () => {
    //     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             id: id,
    //             name: nameOfTheUser,
    //             username: userName,
    //             email: userEmail,
    //             address: {
    //                 street: street,
    //                 suite: suite,
    //                 city: city,
    //             },
    //             phone: phoneNumber,
    //             website: webSite,
    //             posts: userPosts,
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((updatedData) => {
    //             console.log('Updated data:', updatedData);
    //             // dispatch(listUsers(updatedData));
    //             dispatch(listUser(updatedData));

    //             const updatedUsers = users.map(user => {
    //                 if (user.id === updatedData.id) {
    //                     return updatedData;
    //                 }
    //                 return user;
    //             });
    //             dispatch(listUsers(updatedUsers));
    //             console.log('updatedUsers', updatedUsers);
    //         });
    // }
    const addPropertyToUser = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
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
                    website: webSite,
                    posts: userPosts,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            const updatedData = await response.json();
            dispatch(listUser(updatedData));

            const updatedUsers = users.map(user => {
                if (user.id === updatedData.id) {
                    return updatedData;
                }
                return user;
            });
            dispatch(listUsers(updatedUsers));
        } catch (error) {
            console.error('Error adding new property to user', error);
            toast.error('An error occurred while adding new property to user.');
        }
    }

    const togglePosts = () => {
        setShowPosts(prevShowPosts => !prevShowPosts);
    };

    const { users } = useSelector((state) => state.users) as { users: UserInterface[] };

    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    //         method: 'PUT',
    //         body: JSON.stringify({
    //             id: id,
    //             name: nameOfTheUser,
    //             username: userName,
    //             email: userEmail,
    //             address: {
    //                 street: street,
    //                 suite: suite,
    //                 city: city,
    //             },
    //             phone: phoneNumber,
    //             website: webSite
    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((updatedData) => {
    //             console.log('Updated data:', updatedData);
    //             // dispatch(listUsers(updatedData));
    //             dispatch(listUser(updatedData));

    //             const updatedUsers = users.map(user => {
    //                 if (user.id === updatedData.id) {
    //                     return updatedData;
    //                 }
    //                 return user;
    //             });
    //             dispatch(listUsers(updatedUsers));
    //             console.log('updatedUsers', updatedUsers);
    //         });
    // }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
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
            });
            const updatedData = await response.json();
            dispatch(listUser(updatedData));

            const updatedUsers = users.map(user => {
                if (user.id === updatedData.id) {
                    return updatedData;
                }
                return user;
            });
            dispatch(listUsers(updatedUsers));
        } catch (error) {
            console.error('Error submiting new data:', error);
            toast.error('An error occurred while submiting new data.');
        }
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
                addPropertyToUser();
            }}>
                {showPosts ? "Hide user's posts" : "Get user's posts"}
            </button>
            {isLoading ? (
                <>
                    <div className="spinner"></div>
                    <div>Loading...</div>
                </>
            ) : (
                posts && posts.map(post => (
                    <Posts key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default User;