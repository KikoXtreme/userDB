export interface UserInterface {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
    };
    phone: string;
    website: string;
}

export interface Props {
    user: UserInterface;
}

export interface IPosts {
    title: string;
    body: string;
}

export interface PostProps {
    post: IPosts;
}