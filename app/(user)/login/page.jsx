'use client';
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/slices/userSlice'
import { store } from '../../../redux/store'

export default function Login() {

    const router = useRouter()
    const dispatch = useDispatch()
    const url = 'http://localhost:3003/users/login/'

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Bắt buộc'),
            password: Yup.string().required('Bắt buộc'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: values.username, password: values.password }),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Đăng nhập thất bại');
                }
                const data = await res.json();
                const token = data.token;

                if (token && token.split('.').length === 3) {
                    document.cookie = `token=${token}; path=/; max-age=${60 * 60}`;
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    dispatch(login(data));
                    console.log("State after login: ", store.getState().user);
                    const loginEvent = new CustomEvent('login', { detail: { token: data.token } });
                    window.dispatchEvent(loginEvent);
                    alert('Đăng nhập thành công');

                    // Chuyển hướng đến trang user
                    if (payload.role === 'admin') {
                        router.push('/admin');
                    } else {
                        router.push('/info');
                    }
                } else {
                    throw new Error('Token không hợp lệ');
                }
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <div className="container mt-3">
            <h2>Đăng nhập</h2>
            <form onSubmit={formik.handleSubmit} >
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-danger">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary"  name="login" value="đăng nhập" disabled={formik.isSubmitting}>
                    Đăng nhập
                </button>
                {formik.errors.general ? (
                    <div className="text-danger mt-2">{formik.errors.general}</div>
                ) : null}
            </form>
        </div>
    );
}
