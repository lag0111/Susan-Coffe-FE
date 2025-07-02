'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftBar() {
    const pathName = usePathname();
    return (
        <>
            <ul className="nav nav-pills flex-column mb-auto" data-bs-themes>
                <li className="nav-item">
                    <Link href="/admin" className={`nav-link rounded-0 ${pathName == "/admin" ? "active" : "text-white"}`} >
                        <i className="far fa-tachometer-alt-fastest fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders" className={`nav-link rounded-0 ${pathName == "/admin/orders" ? "active" : "text-white"}`}>
                        <i className="far fa-shopping-cart fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/categories" className={`nav-link rounded-0 ${pathName == "/admin/categories" ? "active" : "text-white"}`}>
                        <img src="/img/category (1).png" alt="" width={19} height={19} />
                        <span className="d-none d-sm-inline-block">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/product" className={`nav-link rounded-0 ${pathName == "/admin/product" ? "active" : "text-white"}`}>
                        <i className="far fa-boxes fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/customers" className={`nav-link rounded-0 ${pathName == "/admin/customers" ? "active" : "text-white"}`}>
                        <i className="far fa-users fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Customers</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/ratings" className={`nav-link rounded-0 ${pathName == "/admin/ratings" ? "active" : "text-white"}`}>
                        <i className="far fa-star-half-alt"></i>
                        <span className="d-none d-sm-inline-block">Ratings</span>
                    </Link>
                </li>
            </ul>
        </>
    )
}