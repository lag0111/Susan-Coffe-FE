import Link from "next/link";

export default function Product(props) {
  const product = props.data;
  return (
    <>
      <div className="card" style={{ width: '100%' }}>
        <div style={{ width: '100%', height: '400px' }}>
          <img
            src={`${product.image}`}
            className="card-img-top"
            alt="..."
            style={{width:'100%',height:'100%', objectFit: "fill" }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title" style={{height:'50px'}}>{product.name}</h5>
          <p className="card-text">{product.price.toLocaleString('vi-VN')}đ</p>
          <Link href={`/product/${product._id}`} className="btn btn-dark w-100">
            Đặt mua
          </Link>
        </div>
      </div>
    </>
  );
}