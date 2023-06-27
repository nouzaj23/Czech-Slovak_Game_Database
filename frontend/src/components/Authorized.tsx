import { FC, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { UserApi } from '../services';

type AuthorizedProps = {
    children: ReactNode,
}

export const IsLogged: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();
    if (!auth) return null;
    return <>{children}</>;
}

export const IsNotLogged: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    if (auth) return null;
    return <>{children}</>;
}

type CanDeleteItemAuthorizedProps = {
    children: ReactNode,
    authorId: string,
}

export const CanDeleteItem: FC<CanDeleteItemAuthorizedProps> = ({ children, authorId }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.isAdmin || authorId == auth.userId) return <>{children}</>;
    return null;
}

type WishListProps = {
    children: ReactNode,
    id: string,
}

export const AddToFavourite: FC<WishListProps> = ({ children, id }) => {
    const { auth } = useAuth();
    const { data: user } = useQuery(['user', auth?.userId], () => UserApi.retrieve(auth?.userId), {
        enabled: !!auth?.userId,
    });
    const { data: wishListData } = useQuery<string[]>(['users'], () => UserApi.getWishlist(auth?.userId), {
        enabled: !!auth?.userId,
    });
    const wishlistGameIds: string[] = wishListData ?? [];

    if (!auth || !user) return null;
    if (!wishlistGameIds.includes(id)) return <>{children}</>;
    return null;
}

export const RemoveFromFavourite: FC<WishListProps> = ({ children, id }) => {
    const { auth } = useAuth();
    const { data: user } = useQuery(['user', auth?.userId], () => UserApi.retrieve(auth?.userId), {
        enabled: !!auth?.userId,
    });
    const { data: wishListData } = useQuery<string[]>(['users'], () => UserApi.getWishlist(auth?.userId), {
        enabled: !!auth?.userId,
    });
    const wishlistGameIds: string[] = wishListData ?? [];

    if (!auth || !user) return null;
    if (wishlistGameIds.includes(id)) return <>{children}</>;
    return null;
}


export const CanManageCSHD: FC<AuthorizedProps> = ({ children }) => {
    const { auth } = useAuth();

    if (!auth) return null;
    if (auth.isAdmin) return <>{children}</>;
    return null;
}