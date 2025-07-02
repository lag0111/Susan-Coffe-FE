'use client'
import { addCart } from "@/redux/slices/productsSlice";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";


export default function ProductDetail({ params }) {
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const [cate, setCate] = useState([])
  const [size,setSize] = useState('S');
  const [quantity,setQuantity] = useState(1);
  const {
    data: product,
    error: productError,
    isLoading: productIsLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}product/_id/${params.id}`, fetcher)
  const {
    data: category,
    error: cateError,
    isLoading: cateIsLoading,
  } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}product/nameCate/${params.id}`, fetcher)
  const dispath = useDispatch()
  if (productError || cateError) return <div>Lỗi khi tải dữ liệu</div>;
  if (productIsLoading || cateIsLoading) return <strong>Đang tải dữ liệu...</strong>;
  if (!product || !category) return <div>Không có dữ liệu</div>;
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${product.image}`}
              className="w-100"
            />
          </div>
          <div className="col-md-8">
            <h1>{product.name}</h1>
            Danh mục:{" "}
            <Link href={`/category/${product.categoryId}`} style={{ textDecoration: 'none', color: 'black' }} >
              <strong>
                {category.name}
              </strong>
            </Link>
            <br />
            <div className="text-warning align-baseline">
              {
                [...Array(Math.floor(product.rating))].map((index) => {
                  return (<img key={index} src="/img/star.png" width={16} height={16} />)
                })
              }
              {
                [...Array(5 - Math.floor(product.rating))].map(index => {
                  return (<img key={index} src="/img/star (2).png" />)
                })
              }
              <strong style={{ paddingTop: '60px' }}> {product.rating}</strong>
            </div>
            <div className="display-1">{product.price.toLocaleString()}đ</div>
            <div className="row">
              <div className="col-6">
                Size:
                <select className="form-select mb-3" onChange={(e)=>setSize(e.target.value)}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
              <div className="col-6">
                Số lượng:
                <input type="number" name="" id="" className="form-control" defaultValue={1} min={1} onChange={(e)=>setQuantity(e.target.value)}/>
              </div>
            </div>
            <button className="btn btn-dark mt-3 mb-3 w-100 p-2" onClick={() => dispath(addCart({ product, quantity, size }))}><h6 className="m-0">Thêm vào giỏ hàng</h6></button>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}