'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('vui lòng nhập họ và tên'),
            username: Yup.string().required('vui lòng nhập tên đăng nhập'),
            email: Yup.string().email('Email không hợp lệ').required('vui lòng nhập email'),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
                .required('Vui lòng nhập mật khẩu'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại password'),
            address: Yup.string().required('vui lòng nhập địa chỉ'),
            phone: Yup.string().required('vui lòng nhập số điện thoại')
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: values.fullname,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        address: values.address,
                        phone: values.phone
                    }),
                });
                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 400 && errorData.message === "Tên đăng nhập đã tồn tại") {
                        setFieldError('username', 'tên đăng nhập đã tồn tại');
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                }
                else {
                    alert('Đăng ký thành công');
                }
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });
    return (
        <div className="container">
            <div className="container mt-3">
                <h2>Đăng ký tài khoản</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Fullname</label>
                        <input
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps('fullname')}
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <div className="text-danger">{formik.errors.fullname}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps('username')}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="text-danger">{formik.errors.username}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            {...formik.getFieldProps('rePassword')}
                        />
                        {formik.touched.rePassword && formik.errors.rePassword ? (
                            <div className="text-danger">{formik.errors.rePassword}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps('phone')}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-danger">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            {...formik.getFieldProps('address')}
                        />
                        {formik.touched.address && formik.errors.address ? (
                            <div className="text-danger">{formik.errors.address}</div>
                        ) : null}
                    </div>
                    <button type="submit" className="btn btn-primary my-3" disabled={formik.isSubmitting}>
                        Đăng ký
                    </button>
                    {formik.errors.general && (
                        <p className="my-3 text-danger">{formik.errors.general}</p>
                    )}
                </form>
            </div>
        </div>
    );
}