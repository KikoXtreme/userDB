import { useEffect } from 'react';
import User from '../User/User';
// import { UserInterface } from '../../interfaces/interfaces';
import { dispatch, useSelector } from '../../store';
import { listUsers } from '../../store/reducers/users';
import { UserInterface } from '../../interfaces/interfaces';

const Users = () => {
    // const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then(data => {
        //         setUsers(data);
        //     });
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                // setUsers(data);
                dispatch(listUsers(data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const { users } = useSelector((state) => state.users) as { users: UserInterface[] };


    return (
        <div>
            {users!.map(user => (
                <User key={user.id} user={user} />
            ))}
        </div>
    );
};

export default Users;