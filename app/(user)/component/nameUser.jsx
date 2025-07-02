'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../../public/css/bootstrap.min.css'
import '../../../public/css/layout.css'

export default function NameUser() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async (tokenValue) => {
        try {
            const res = await fetch('http://localhost:3003/users/detailuser', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            if (!res.ok) {
                throw new Error('Không thể lấy thông tin người dùng');
            }

            const data = await res.json();
            setUserInfo(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];
        if (tokenValue) {
            setIsLoggedIn(true);
            fetchUserInfo(tokenValue);
        } else {
            setLoading(false);
        }
        const handleLogin = (event) => {
            const { token } = event.detail;
            setIsLoggedIn(true);
            fetchUserInfo(token);
        };

        window.addEventListener('login', handleLogin);

        return () => {
            window.removeEventListener('login', handleLogin);
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <li class="nav-item dropdown">
                <Link class="nav-link dropdown-toggle"  href={isLoggedIn ? '/info' : '/login'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <strong className="ms-2">{isLoggedIn ? `Xin chào, ${userInfo?.username}` : "Xin chào, khách!"}</strong>
                </Link>
                <ul class="dropdown-menu">
                    <li><Link className={`dropdown-item ${isLoggedIn ? 'disabled' : ''}`} href="/login">Đăng nhập</Link></li>
                    <li><Link className={`dropdown-item ${isLoggedIn ? 'disabled' : ''}`} href="/register">Đăng ký</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item"  href={isLoggedIn ? '/info' : '/login'}>{isLoggedIn ? ` ${userInfo?.username}` : "Khách"}</Link></li>
                </ul>
            </li>
        </>
    );
}