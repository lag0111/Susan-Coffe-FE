'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchUserInfo = async (tokenValue) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/detailuser`, {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];
        if (tokenValue) {
            fetchUserInfo(tokenValue);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!isLoggedIn) {
                alert('Bạn không có quyền truy cập vào trang này.');
                router.push('/');
            }
        }
    }, [loading, isLoggedIn, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isLoggedIn) {
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}
