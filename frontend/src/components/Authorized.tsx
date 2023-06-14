import { FC, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { UserApi } from '../services';

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
    if (auth.isAdmin || auth.item.reviews.includes(id)) return <>{children}</>;
    return null;
}

export const AddToFavourite: FC<CanDeleteReviewAuthorizedProps> = ({ children, id }) => {
    const { auth } = useAuth();
    const { data: user } = useQuery(['user', auth?.userId], () => UserApi.retrieve(auth?.userId), {
      enabled: !!auth,
    });

    if (!auth || !user) return null;
    if (user.wishlist.includes(id)) return <>{children}</>;
    return null;
}

export const RemoveFromFavourite: FC<CanDeleteReviewAuthorizedProps> = ({ children, id }) => {
        const { auth } = useAuth();
        const { data: user } = useQuery(['user', auth?.userId], () => UserApi.retrieve(auth?.userId), {
          enabled: !!auth,
        });
    
        if (!auth || !user) return null;
        if (!user.wishlist.includes(id)) return <>{children}</>;
        return null;
}


export const CanManageCSHD: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.isAdmin) return <>{children}</>;
    return null;
}