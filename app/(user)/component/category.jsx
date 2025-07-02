"use client"
import Link from "next/link"
import { useState } from "react"
import useSWR from "swr";


export default function Category() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const {
        data: category,
        error,
        isLoading,
    } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}categories`, fetcher)
    if (error) console.log(error);
    if (isLoading) return <strong>Đang tải dữ liệu</strong>
    return (
        <>
            {category && category.map((item) => (
                <Link href={'/'} className="text-center text-decoration-none text-dark fw-bold" key={item._id}>
                    <img src={`/img/${item.image}`} alt="" style={{ width: '48px' }} />
                    <br />
                    {item.name}
                </Link>
            ))
            }
        </>
    )
}