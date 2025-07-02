import Image from "next/image";
import styles from "./page.module.css";
import '../../public/css/bootstrap.min.css'
import Slider from "./component/slider";
import Link from "next/link";
import Product from "./component/product";
import ProductList from "./component/productList";
import Category from "./component/category";
export default function Home() {
  return (<>
    <Slider />
    <div className="d-flex justify-content-center my-3 gap-3">
      <Category></Category>
      </div>
    <div className="container">
      <h1 className="text-center">
        Sản phẩm nổi bật
      </h1 >
      <ProductList ></ProductList>
    </div>
  </>
  );
}
