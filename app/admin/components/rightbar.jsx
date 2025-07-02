'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import '../../../public/css/layout.css'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { clearCart } from '../../../redux/slices/productsSlice';


export default function RightBar() {
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserInfo = async (tokenValue) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/detailuser`, {
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

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        document.cookie = 'token=; path=/; max-age=0';
        window.location.href = '/';
    }

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <>
            <nav className="navbar navbar-expand-md text-bg-primary" data-bs-theme="dark">
                <div className="container-fluid ps-0">
                    <div className="d-flex justify-content-between w-100">
                        <form className="d-flex w-100" role="search" data-bs-theme="light">
                            <div className="input-group">
                                <button type="submit" className="btn btn-primary rounded-0 border-white">
                                    <i className="far fa-search"></i>
                                </button>
                                <input className="form-control me-2 rounded-0 border-white" type="search" placeholder="Search" />
                            </div>
                        </form>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto" data-bs-theme="light">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <strong><i className="fas fa-bell"></i></strong>
                                </a>
                                <ul className="dropdown-menu rounded-0 dropdown-menu-md-end">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Settings action</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                                    <strong>{isLoggedIn ? userInfo?.username : "admin"} </strong>
                                </Link>
                                <ul className="dropdown-menu rounded-0 dropdown-menu-md-end">
                                    <li><Link className={`dropdown-item`} href="/">Trang chủ</Link></li>
                                    <li><Link className={`dropdown-item`} href="/admin">admin</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Sign out</button></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}