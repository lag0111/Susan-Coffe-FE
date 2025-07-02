'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"



export default function Product() {
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data: productList, error: errorProduct, isLoading: isLoadingProduct, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}product/nameCategories`, fetcher)
    const { data: categoryList, error: errorCate, isLoading: isLoadingCate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}categories`, fetcher)
    const [productCount, setProductCount] = useState(0)
    const [cateCount, setCateCount] = useState(0)
    useEffect(() => {
        if (productList) {
            setProductCount(productList.length);
        }
    }, [productList]);
    useEffect(() => {
        if (categoryList) {
            setCateCount(categoryList.length);
        }
    }, [categoryList]);
    const deleteCate = async (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
            try {
                const res = await fetch(`http://localhost:3003/categories/_id/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    alert('Xóa danh mục thành công');
                    mutate();
                } else {
                    throw new Error(`HTTP error ${res.status}`);
                }
            } catch (error) {
                console.error(error);
                alert('Có lỗi xảy ra khi xóa danh mục');
            }
        }
    };
    if (errorProduct || errorCate) return <strong>Có Lỗi Xảy Ra</strong>
    if (isLoadingProduct || isLoadingCate) return <strong>Đang Tải Dữ Liệu ..... </strong>
    return (
        <>
            <div className="d-flex justify-content-between">
                <h3 className="mb-4">Categories</h3>
                <div>
                    <Link href="/admin/product" className="btn btn-outline-success rounded-0">Manage Products</Link>
                    <Link href="/admin/categories/add" className="btn btn-primary rounded-0">Add Categories</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-primary-subtle text-primary">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-box"></i>
                                {productCount}
                            </div>
                            PRODUCTS
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-danger-subtle text-danger">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-box-open"></i>
                                3
                            </div>
                            RUNNING OUT
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-success-subtle text-success">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-boxes"></i>
                                {cateCount}
                            </div>
                            CATEGORIES
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="card border-0 rounded-0 bg-dark-subtle text-dark">
                        <div className="card-body text-end">
                            <div className="display-6 d-flex justify-content-between">
                                <i className="fal fa-archive"></i>
                                0
                            </div>
                            ARCHIVE
                        </div>
                    </div>
                </div>
            </div>

            <div className="card rounded-0 border-0 shadow-sm">
                <div className="card-body">
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th className="text-start" colspan="2">Categories</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {categoryList.map((item) => (
                                <tr key={item._id}>
                                    <td style={{ width: "64px" }}>
                                        <img src={item.image} className="w-100" />
                                    </td>
                                    <td className="text-start">
                                        <strong>
                                            {item.name}
                                        </strong>
                                        <br />
                                        <small>
                                            Id: <strong>{item._id}</strong> 
                                        </small>
                                    </td>
                                    <td>
                                        {/* <a href="#" target="_blank" className="btn btn-primary btn-sm">
                                            <i className="fas fa-eye fa-fw"></i>
                                        </a> */}
                                        <Link href={`/admin/editC/${item._id}`} className="btn btn-outline-warning btn-sm">
                                            <i className="fas fa-pencil fa-fw"></i>
                                        </Link>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteCate(item._id)}>
                                            <i className="fas fa-times fa-fw"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}