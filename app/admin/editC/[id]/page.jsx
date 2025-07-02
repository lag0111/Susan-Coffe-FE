'use client'

import { useState, useEffect } from "react"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from "next/link"

export default function EditProduct({ params }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imagePreview, setImagePreview] = useState('');
    const router = useRouter();

    const [category, setCategory] = useState(null)

    useEffect(() => {
        const getCate = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories/_id/${params.id}`)
            const data = await res.json();
            setCategory(data);
            setValue('name', data.name)
            setValue('image', data.image)
        }
        getCate()
    }, [params.id, setValue])


    const onSubmit = async (data) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.image[0]) {
            formData.append('image', data.image[0]);
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}categories/_id/${params.id}`, {
            method: 'PUT',
            body: formData,
        });
        const result = await res.json();
        if (!result.error) {
            alert('Sửa thành công');
            router.push('/admin/categories');
        } else {
            console.error(result.error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Sửa Danh Mục</h3>
                <div>
                    <Link href="/admin/categories" className="btn btn-outline-secondary rounded-0">
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
                                    {...register('image')}
                                />
                                {errors.image && <div className="text-danger">{errors.image.message}</div>}
                                <div className="bg-secondary-subtle mb-3 p-2 text-center">
                                    <img src={imagePreview} className="w-50" alt="Category preview" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg rounded-0 mt-4 w-100">Cập Nhật Danh Mục</button>
                </div>
            </form>
        </>
    )
}
