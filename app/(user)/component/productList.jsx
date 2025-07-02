"use client"
import Product from "./product";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}product/`, { cache: 'no-cache' })
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  useEffect(() => {
    if (typeof window !== "undefined") {
        const script = document.createElement("script");
        script.src = "/js/bootstrap.bundle.min.js";
        script.async = true;
        document.body.appendChild(script);
    }
}, []);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products && Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  const handleNextPage = () => {
      if (currentPage < Math.ceil(products.length / productsPerPage)) {
          setCurrentPage(currentPage + 1);
      }
  };

  const handlePreviousPage = () => {
      if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
      }
  };

  return (
    <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
      {currentProducts.map((item) => {
        return (
          <div key={item._id} className="col" style={{ width: '25%', paddingBottom: '10px' }}>
            <Product data={item} />
          </div>
        );
      })}
      <div className="container" style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}>
        <button className="btn btn-outline-dark" onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button className="btn btn-outline-dark" onClick={handleNextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>Next</button>
      </div>
    </div>
  );
}