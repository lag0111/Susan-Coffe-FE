"use client";
import useSWR from "swr";
import ProductList2 from "../../component/productList2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function MenuId({ params }) {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: products, error: errorProduct, isLoading: isLoadingProduct } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}product/cateid/${params.id}`, fetcher);

    if (errorProduct) return <div>Lỗi khi tải dữ liệu</div>;
    if (isLoadingProduct) return <strong>Đang tải dữ liệu...</strong>;
    // if (!cate || cate.length === 0 && !products || products.length === 0) return <div>Không có dữ liệu</div>;

    return (
        <>
            <ProductList2 data={products}></ProductList2>
        </>
    );
}
