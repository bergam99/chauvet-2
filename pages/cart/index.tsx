import { useCartStore } from "@/stores/cart";
import Image from "next/image";
import { useEffect, useState } from "react";
// import classes from './'
const Cart = () => {
  const { cart, remove, removeAll, loadCart } = useCartStore();
  console.log({ cart });

  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    loadCart();
    setIsLoading(false);
  }, [loadCart]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.count * item.price;
  }, 0);

  return (
    <>
      <section>
        {cart.length ? (
          cart.map((item) => (
            <section key={item._id.toString()}>
              <Image
                src={item.images[0]?.url}
                alt={item.name}
                width={400}
                height={300}
              />
              <p>name:{item.name}</p>
              <p>each price:{item.price}</p>
              <p>quantity:{item.count}</p>
              <p>each total:{item.count * item.price}</p>
              <hr />
              <button
                onClick={() => {
                  remove(item._id.toString());
                  close();
                }}
              >
                Confirm Delete
              </button>
            </section>
          ))
        ) : (
          <p>nothing. . . </p>
        )}
      </section>
      <p className="totalprice">{totalPrice ? totalPrice : ""}</p>
      {cart.length ? <button onClick={removeAll}>remove all</button> : ""}
    </>
  );
};

export default Cart;
