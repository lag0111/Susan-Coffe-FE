'use client'

import { useFormik } from "formik"
import { useState } from "react"
import useSWR from "swr"
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import Link from "next/link";

export default function AddProduct() {
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: cate, error: errorCate, isLoading: isLoadingCate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}categories`, fetcher)
    const [imagePreview, setImagePreview] = useState();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            price: null,
            image: null,
            rating: null,
            categoryId: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên sản phẩm'),
            description: Yup.string().required('Vui lòng nhập mô tả'),
            price: Yup.number()
                .required('Vui lòng nhập giá')
                .positive('Giá phải là số dương')
                .integer('Giá phải là số nguyên'),
            image: Yup.mixed()
                .required('Vui lòng tải lên một ảnh')
                .test(
                    'fileSize',
                    'File quá lớn, kích thước tối đa là 2MB',
                    value => !value || (value && value.size <= 50 * 1024 * 1024) 
                )
                .test(
                    'fileFormat',
                    'Định dạng file không hợp lệ, chỉ chấp nhận JPG, JPEG, GIF, PNG',
                    value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
                ),
            rating: Yup.number()
                .required('Vui lòng nhập đánh giá')
                .min(0, 'Đánh giá phải từ 0 trở lên')
                .max(5, 'Đánh giá không được vượt quá 5')
                .typeError('Đánh giá phải là một số'),
            categoryId: Yup.string().required('Vui lòng chọn danh mục'),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("image", values.image);
            formData.append("price", values.price);
            formData.append("rating", values.rating);
            formData.append("description", values.description);
            formData.append("categoryId", values.categoryId);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product`, {
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                });

                if (res.ok) {
                    alert('Thêm sản phẩm thành công');
                    router.push('/admin');
                } else {
                    const errorData = await res.json();
                    throw new Error(`HTTP error ${res.status}: ${errorData.message}`);
                }
            } catch (error) {
                console.error(error);
                alert('Có lỗi xảy ra khi thêm sản phẩm');
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

    if (errorCate) return <strong>Có lỗi xảy ra khi tải danh mục</strong>
    if (isLoadingCate) return <strong>Đang tải dữ liệu ..... </strong>

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Thêm Sản Phẩm</h3>
                <div>
                    <Link href="/admin/product" className="btn btn-outline-secondary rounded-0">
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
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Mô Tả</label>
                                <textarea
                                    className="form-control rounded-0"
                                    id="description"
                                    rows="6"
                                    name="description"
                                    {...formik.getFieldProps('description')}
                                ></textarea>
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-danger">{formik.errors.description}</div>
                                ) : null}
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="rating" className="form-label">Đánh Giá</label>
                                    <input
                                        type="number"
                                        className="form-control rounded-0"
                                        id="rating"
                                        step={0.001}
                                        {...formik.getFieldProps('rating')}
                                    />
                                    {formik.touched.rating && formik.errors.rating ? (
                                        <div className="text-danger">{formik.errors.rating}</div>
                                    ) : null}
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="category" className="form-label">Danh Mục *</label>
                                    <div className="input-group">
                                        <select
                                            className="form-select rounded-0"
                                            id="categoryId"
                                            name="categoryId"
                                            {...formik.getFieldProps('categoryId')}
                                        >
                                            <option value="">Chọn danh mục</option>
                                            {cate?.map((item) => (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            ))}
                                        </select>
                                        <button type="button" className="btn btn-outline-primary rounded-0">
                                            <i className="fal fa-boxes"></i>
                                        </button>
                                    </div>
                                    {formik.touched.categoryId && formik.errors.categoryId ? (
                                        <div className="text-danger">{formik.errors.categoryId}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card rounded-0 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Giá</h6>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="price" className="form-label">Giá *</label>
                                    <input
                                        type="number"
                                        className="form-control rounded-0"
                                        id="price"
                                        {...formik.getFieldProps('price')} />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="text-danger">{formik.errors.price}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card rounded-0 border-0 shadow-sm">
                        <div className="card-body">
                            <h6 className="pb-3 border-bottom">Hình Ảnh</h6>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Ảnh Sản Phẩm *</label>
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
                                        <img src={imagePreview} className="w-50" alt="Product preview" />
                                    ) : (
                                        <img src="/img/products/iphone.webp" className="w-50" alt="Chưa chọn ảnh, không thể hiện" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Tạo Sản Phẩm</button>
                </div>
            </form>
        </>
    )
}
