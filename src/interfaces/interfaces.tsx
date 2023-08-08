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
    posts: {
        title: string,
        body: string,
    },
}

export interface Props {
    user: UserInterface;
}

export interface IPosts {
    id: string;
    title: string;
    body: string;
}

export interface PostProps {
    post: IPosts;
}