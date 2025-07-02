'use client'

import ProductList2 from "../component/productList2";
import Link from "next/link";
import useSWR from "swr";
import { usePathname } from "next/navigation";


export default function Menu() {
    const fetcher = (...args) => fetch(...args).then(res => res.json());
    const { data: products, error: errorProduct, isLoading: isLoadingProduct } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}product`, fetcher);

    if (errorProduct) return <div>Lỗi khi tải dữ liệu</div>;
    if ( isLoadingProduct) return <strong>Đang tải dữ liệu...</strong>;

    return (
        <>
            <ProductList2 data={products}></ProductList2>
        </>
    )
}