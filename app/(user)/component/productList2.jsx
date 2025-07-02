"use client";
import { useSelector } from "react-redux";
import Product from "./product";
import { useEffect, useState, useRef } from "react";

export default function ProductList2(props) {
  const { min, max } = useSelector((state) => state.filter);
  const sortType = useSelector((state) => state.sort);

  let defaultProduct = useRef([...props.data]);
  const [products, setProducts] = useState(defaultProduct.current);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    let filteredProducts = defaultProduct.current.filter((item) => min <= item.price && item.price <= max);

    if (sortType === 'ASC') {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'DESC') {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(filteredProducts);
  }, [min, max, sortType]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

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

  if (!products || products.length === 0) {
    return <div>No products available.</div>
  }

  return (
    <>
      <div className="row row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2">
        {currentProducts.map((item) => (
          <div key={item._id} className="col" style={{ width: '25%', paddingBottom: '10px' }}>
            <Product data={item} />
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)}>Next</button>
      </div>
    </>
  );
}