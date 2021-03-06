import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "..";
import { LoadingBox, MessageBox } from "../../components";
import { listProducts } from "../../redux/actions/productActions";
import "./products.css";

export default function Products() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="error">Uh oh.. something went wrong...</MessageBox>
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
