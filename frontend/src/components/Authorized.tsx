import { FC, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

type AuthorizedProps = {
    children: ReactNode,
}

export const IsLogged: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    // if (!auth || !roles.includes(auth.item.role)) return null;
    if (!auth) return null;
    return <>{children}</>;
}

export const IsNotLogged: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    if (auth) return null;
    return <>{children}</>;
}

type CanDeleteReviewAuthorizedProps = {
    children: ReactNode,
    id: string,
}

export const CanDeleteReview:  FC<CanDeleteReviewAuthorizedProps> = ({ children, id }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.message == "ADMIN" || auth.item.reviews.includes(id)) return <>{children}</>;
    return null;
}

export const AddToFavourite: FC<CanDeleteReviewAuthorizedProps> = ({ children, id }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.item.wishlist.includes(id)) return <>{children}</>;
    return null;
}

export const RemoveFromFavourite: FC<CanDeleteReviewAuthorizedProps> = ({ children, id }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (!auth.item.wishlist.includes(id)) return <>{children}</>;
    return null;
}

export const CanManageCSHD: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.message == "ADMIN") return <>{children}</>;
    return null;
}