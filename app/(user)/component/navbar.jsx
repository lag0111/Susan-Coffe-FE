'use client'
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"
import NameUser from "./nameUser";
import '../../../public/css/bootstrap.min.css'



export default function NavBar() {
    const cart = useSelector((state) => state.cart.cart)
    const totalItem = cart.reduce((total, item) => total + item.quantity, 0)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const script = document.createElement("script");
            script.src = "/js/bootstrap.bundle.min.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" href="/" style={{ color: 'green' }}>
                        <i>
                            <img src="/img/icons8-coffee-48.png" alt="" width={32} height={32} style={{ marginRight: 5 }} />
                        </i>
                        <strong>Susan Coffee</strong>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/" style={{ color: 'black' }}>Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/menu" style={{ color: 'black' }}>Menu</Link>
                            </li>

                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/cart" style={{ color: 'black', position: 'relative' }}>
                                    {totalItem == 0 ? (
                                        <div>Giỏ hàng</div>
                                    ) : (
                                        <>
                                            <img src="/img/shopping-bag.png" alt="Giỏ hàng" />
                                            <div style={{ textAlign: "center", position: 'absolute', top: '25px', left: '25px', background: 'red', borderRadius: '100%', width: '30px', height: '30px', color: 'white', fontWeight: 500, paddingTop: '2px' }}>
                                                {totalItem > 99 ? '99+' : totalItem}
                                            </div>
                                        </>
                                    )}
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <NameUser></NameUser>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
