import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { addToCart } from "../../redux/actions/cartActions";

export default function Cart() {
  const dispatch = useDispatch();
  const { id: productId } = useParams();

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const sizeInUrl = new URLSearchParams(search).get("size");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;
  const size = sizeInUrl ? String(sizeInUrl) : "S";

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  return (
    <div>
      <h1>Cart</h1>
      <p>
        ProductId: {productId} Qty: {qty} Size: {size}
      </p>
    </div>
  );
}
