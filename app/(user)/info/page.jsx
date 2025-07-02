'use client';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { clearCart } from '../../../redux/slices/productsSlice';

export default function Info() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy token từ cookie
        const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];

        if (!tokenValue) {
            window.location.href = '/login';
            return;
        }

        const getUser = async () => {
            console.log(tokenValue);
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

        getUser();
    }, []);
    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        document.cookie = 'token=; path=/; max-age=0';
        window.location.href = '/';
    }

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className='container'>
            <h2>Thông tin cá nhân</h2>
            <div>
                <p><strong>Email:</strong> {userInfo?.email}</p>
                <p><strong>Tên:</strong> {userInfo?.fullname}</p>
                <p><strong>Phone:</strong> {userInfo?.phone}</p>
                <p><strong>Địa chỉ:</strong> {userInfo?.address}</p>
            </div>
            <button className='btn btn-danger' onClick={handleLogout}>
                Đăng xuất
            </button>
        </div>
    );
}
