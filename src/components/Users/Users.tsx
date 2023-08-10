import { useEffect, useState } from 'react';
import User from '../User/User';
import { dispatch, useSelector } from '../../store';
import { listUsers } from '../../store/reducers/users';
import { UserInterface } from '../../interfaces/interfaces';
import '../css/spinner.css'; // Import the CSS file for the spinner

const Users = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                dispatch(listUsers(data));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const { users } = useSelector((state) => state.users) as { users: UserInterface[] };

    return (
        <div>
            {isLoading ? (
                <>
                    <div className="spinner"></div>
                    <div>Loading...</div>
                </>
            ) : (
                users.map(user => (
                    <User key={user.id} user={user} />
                ))
            )}
        </div>
    );
};

export default Users;