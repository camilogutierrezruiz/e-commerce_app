import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPurchasesThunk } from "../redux/actions";

const Purchases = () => {
  const dispatch = useDispatch();
  const purchases = useSelector((state) => state.purchases);

  useEffect(() => {
    dispatch(getPurchasesThunk());
  }, [dispatch]);

  return (
    <div>
      <h1>RutaPurchases</h1>
      {purchases.map((purchase) => (
        <li key={purchase.id}>
          <section>
            <h1>{purchase.createdAt}</h1>
            {purchase?.cart?.products.map((product) => (
              <p key={purchase?.cart?.products?.id}>{product.title}</p>
            ))}
          </section>
        </li>
      ))}
    </div>
  );
};

export default Purchases;
