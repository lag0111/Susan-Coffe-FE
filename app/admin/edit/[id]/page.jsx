'use client'

import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import useSWR from "swr"
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function EditProduct({ params }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: cate, error: errorCate, isLoading: isLoadingCate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}categories`, fetcher)
    const [imagePreview, setImagePreview] = useState('');
    const router = useRouter();

    const [product, setProduct] = useState(null)

    useEffect(() => {
        const getProduct = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/_id/${params.id}`)
            const data = await res.json();
            setProduct(data);
            setValue('name', data.name)
            setValue('image', data.image)
            setValue('price', data.price)
            setValue('sale', data.sale)
            setValue('description', data.description)
            setValue('rating', data.rating)
            setValue('categoryId', data.categoryId)
            setImagePreview(data.image);
        }
        getProduct()
    }, [params.id, setValue])


    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}product/_id/${params.id}`, {
            method: 'PUT',
            body: formData,
        });
        const result = await res.json();
        if (!result.error) {
            alert('Sửa thành công');
            router.push('/admin/product');
        } else {
            console.error(result.error);
        }
    };


    if (errorCate) return <strong>Có lỗi xảy ra khi tải danh mục</strong>
    if (isLoadingCate) return <strong>Đang tải dữ liệu ..... </strong>

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Sửa Sản Phẩm</h3>
                <div>
                    <Link href="/admin/product" className="btn btn-outline-secondary rounded-0">
                        <i className="far fa-long-arrow-left"></i> Quay lại
                    </Link>
                </div>
            </div>
            <form className="row" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                                    {...register('name')}
                                />
                                {errors.name && <div className="text-danger">{errors.name.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Mô Tả</label>
                                <textarea
                                    className="form-control rounded-0"
                                    id="description"
                                    rows="6"
                                    name="description"
                                    {...register('description')}
                                ></textarea>
                                {errors.description && <div className="text-danger">{errors.description.message}</div>}
                            </div>
                            <div className="row">
                                <div className="col mb-3">
                                    <label htmlFor="rating" className="form-label">Đánh Giá</label>
                                    <input
                                        type="number"
                                        className="form-control rounded-0"
                                        id="rating"
                                        step={0.001}
                                        {...register('rating')}
                                    />
                                    {errors.rating && <div className="text-danger">{errors.rating.message}</div>}
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="category" className="form-label">Danh Mục *</label>
                                    <div className="input-group">
                                        <select
                                            className="form-select rounded-0"
                                            id="categoryId"
                                            name="categoryId"
                                            {...register('categoryId')}
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
                                    {errors.categoryId && <div className="text-danger">{errors.categoryId.message}</div>}
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
                                        {...register('price')} />
                                    {errors.price && <div className="text-danger">{errors.price.message}</div>}
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
                                    {...register('image')}
                                />
                                {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                    <img src={imagePreview} className="w-50" alt="Product preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Cập Nhật Sản Phẩm</button>
                </div>
            </form>
        </>
    )
}
