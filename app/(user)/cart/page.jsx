'use client'
import { clearCart, deleteCart, updateQuantity } from "@/redux/slices/productsSlice"
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import '../../../public/css/bootstrap.min.css'
import { useEffect } from 'react';
import { useRouter } from "next/navigation"

export default function Cart() {
    let cart = useSelector((state) => state.cart.cart)
    const dispath = useDispatch()
    const [fullname, setFullname] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const route = useRouter()
    const closeBtn = useRef()

    const submit = (e) => {

        e.preventDefault()
        fetch(`${process.env.NEXT_PUBLIC_API_URL}order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: null,
                user: {
                    fullname,
                    phone,
                    address,
                },
                detail: cart,
                total_money: total
            })
        }).then((res) => {
            alert("đặt hàng thành công")
            dispath(clearCart())
            closeBtn.current.click();
            route.push('/')
        })
    }

    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    const totalItem = useMemo(() => {
        return cart.reduce((totals, item) => totals + item.quantity, 0)
    }, [cart])
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
            <div className="container mt-5">
                <h1>Giỏ hàng</h1>
                {totalItem == 0 ? (
                    <>
                        <div style={{ textAlign: 'center', padding: '200px' }}>
                            <h2>Không có sản phẩm nào trong giỏ hàng</h2>
                            <br />
                            <h2>Tiếp tục mua hàng tại <Link href="/" style={{ textDecoration: 'none' }}>trang chủ</Link></h2>
                        </div>
                    </>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className="align-baseline" >
                                <th className="col-2">
                                    Sản phẩm
                                </th>
                                <th className="text-end col-2">
                                    Giá bán
                                </th>
                                <th className="text-center col-2">
                                    Số lượng
                                </th>
                                <th className="text-end col-2">
                                    Thành tiền
                                </th>
                                <th className=" col-2 " style={{ paddingLeft: '100px' }}>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item) => (
                                    <tr key={item._id} className="align-baseline" >
                                        <td>
                                            <span style={{ width: '100px', height: '140px', display: 'block', overflow: 'hidden' }}>
                                                <img
                                                    src={`${item.image}`}
                                                    className="img-thumbnail mcol-2"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    alt={item.name}
                                                />
                                            </span>
                                            <span style={{ float: 'left' }}><strong >{item.name} </strong> - size: {item.size}</span>
                                        </td>
                                        <td className="text-end"><div className="m-2">{item.price.toLocaleString('vi-VN')} đ</div></td>
                                        <td className="text-center">
                                            <input
                                                type="number"
                                                name=""
                                                className="form-control m-auto"
                                                id="" defaultValue={item.quantity}
                                                style={{ width: 100 }}
                                                min={1}
                                                onChange={(e) => dispath(updateQuantity(
                                                    {
                                                        product: item,
                                                        quantity: e.target.value,
                                                        size: item.size
                                                    }
                                                ))}
                                            />
                                        </td>
                                        <td className="text-end"><div className="m-2">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</div></td>
                                        <td style={{ paddingLeft: '100px' }}>
                                            <button className="btn btn-sm" onClick={() => dispath(deleteCart({ product: item, size: item.size }))}>
                                                <img
                                                    src={'/img/delete.png'}
                                                    className="card-img-top"
                                                    alt="..."
                                                /></button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colSpan={3} className="text-end">Tổng thành tiền</th>
                                <th className="text-end">{total.toLocaleString('vi-VN')} đ</th>
                                <th>
                                    <button className="btn btn-sm btn-outline-danger " onClick={() => dispath(clearCart())}>Xóa toàn bộ giỏ hàng</button>
                                </th>
                            </tr>
                        </tfoot>
                    </table>
                )}
                <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Đặt hàng
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onSubmit={submit}>
                    <form className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Thông tin giao hàng </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeBtn}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div class="mb-3">
                                        <label for="fullname" class="form-label"> Họ tên</label>
                                        <input type="text" class="form-control" id="fullname" onChange={(e) => setFullname(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="phone" class="form-label">Số điện thoại</label>
                                        <input type="text" class="form-control" id="phone" onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="address" class="form-label">Địa chỉ</label>
                                        <input type="text" class="form-control" id="address" onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                                <button type="submit" className="btn btn-primary">Xác nhận</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <script src="/js/bootstrap.bundle.min.js"></script>
        </>
    )
}