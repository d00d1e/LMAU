import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "..";
import { listProducts } from "../../redux/actions/productActions";
import "./products.css";

export default function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        "Loading..."
      ) : error ? (
        "Uh oh.. something went wrong.."
      ) : (
        <>
          <h1 className="products__header">Shop Products</h1>
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
