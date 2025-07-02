'use client'

import ProductList from "../component/productList";
import Link from "next/link";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortASC, sortDESC, sortDefault } from "@/redux/slices/sortProduct";
import { setMax, setMin } from "@/redux/slices/filterSlice";


export default function RootLayout({ children }) {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const pathName = usePathname()
    const { data: cate, error: errorCate, isLoading: isLoandingCate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}categories`, fetcher)
    const dispatch = useDispatch()
    const sortType = useSelector((state) => state.sort)

    if (errorCate) return <div>Lỗi khi tải dữ liệu</div>;
    if (isLoandingCate) return <strong>Đang tải dữ liệu...</strong>;
    if (!cate) return <div>Không có dữ liệu</div>;
    return (
        <div className="container mt-5">
            <h1>Menu</h1>
            <div className="row">
                <div className="col-sm-3" >
                    <div class="card mb-3" >
                        <div class="card-header">
                            <h5 className="mb-0">Danh mục</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <Link href={`/menu`} style={{ textDecoration: 'none', color: 'black', fontWeight: 700 }} ><li className={`list-group-item ${pathName == "/menu" ? "text-bg-dark" : ""}`}>Tất cả</li></Link>

                            {
                                cate.map((item) => (
                                    <Link key={item._id} href={`/menu/${item._id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 700 }}><li className={`list-group-item ${pathName == `/menu/${item._id}` ? "text-bg-dark" : ""}`}>{item.name}</li></Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className="mb-0">
                                Sắp xếp
                            </h5>
                        </div>
                        <div className="card-body p-2">
                            <div className="button-group" style={{ boxSizing: "border-box", textAlign: 'center' }}>
                                <button
                                    className={`btn btn-${sortType == null ? '' : 'outline-'}dark`}
                                    onClick={() => dispatch(sortDefault())}
                                >Mặc định</button>
                                <button
                                    className={`btn btn-${sortType == 'ASC' ? '' : 'outline-'}dark`}
                                    onClick={() => dispatch(sortASC())}
                                >Giá tăng</button>
                                <button
                                    className={`btn btn-${sortType == 'DESC' ? '' : 'outline-'}dark`}
                                    onClick={() => dispatch(sortDESC())}
                                >Giá giảm</button>
                            </div>
                        </div>
                    </div>
                    <div class="card" >
                        <div class="card-header">
                            <h5 className="mb-0">Khoảng giá</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-group">
                                <div className="input-group-text">
                                    Từ
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    min={10000}
                                    max={100000}
                                    step={5000}
                                    defaultValue={10000}
                                    onChange={(e) => dispatch(setMin(e.target.value))}
                                />
                                <div className="input-group-text">
                                    Đến
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    min={10000}
                                    max={100000}
                                    step={5000}
                                    defaultValue={9999999}
                                    onChange={(e) => dispatch(setMax(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    {children}
                </div>
            </div>
        </div>
    );
}