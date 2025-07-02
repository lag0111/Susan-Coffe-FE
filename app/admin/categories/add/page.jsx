'use client'

import { useFormik } from "formik"
import { useState } from "react"
import useSWR from "swr"
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function AddCategory() {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const [imagePreview, setImagePreview] = useState();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên danh mục'),
            image: Yup.mixed()
                .required('Vui lòng tải lên một ảnh')
                .test(
                    'fileSize',
                    'File quá lớn, kích thước tối đa là 2MB',
                    value => !value || (value && value.size <= 50 * 1024 * 1024) //thêm đc ảnh kích thước 50mb ae nào muốn đổi thì thay đổi
                )
                .test(
                    'fileFormat',
                    'Định dạng file không hợp lệ, chỉ chấp nhận JPG, JPEG, GIF, PNG',
                    value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
                ),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });

                if (res.ok) {
                    alert('Thêm danh mục thành công');
                    router.push('/admin');
                } else {
                    const errorData = await res.json();
                    throw new Error(`HTTP error ${res.status}: ${errorData.message}`);
                }
            } catch (error) {
                console.error(error);
                alert('Có lỗi xảy ra khi thêm danh mục');
            }
        }
    });

    const handleImageChange = (e) => {
        const file = e.currentTarget.files[0];
        formik.setFieldValue("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };


    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Thêm Danh Mục</h3>
                <div>
                    <Link href="/admin/categories" className="btn btn-outline-secondary rounded-0">
                        <i className="far fa-long-arrow-left"></i> Quay lại
                    </Link>
                </div>
            </div>
            <form className="row" onSubmit={formik.handleSubmit}>
                <div className="col-md-8 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm mb-4">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Thông Tin Cơ Bản</h6>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Tên *</label>
                                <input
                                    type="text"
                                    className="form-control rounded-0"
                                    id="name"
                                    name="name"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">{formik.errors.name}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Hình Ảnh</h6>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Ảnh Danh Mục *</label>
                                <input
                                    className="form-control rounded-0"
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <div className="text-danger">{formik.errors.image}</div>
                                ) : null}
                                <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                    {imagePreview ? (
                                        <img src={imagePreview} className="w-50" alt="Categories preview" />
                                    ) : (
                                        <img src="/img/products/iphone.webp" className="w-50" alt="Chưa chọn ảnh, không thể hiện" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Tạo Danh Mục</button>
                </div>
            </form>
        </>
    )
}
