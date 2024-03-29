import Close from "@/components/buttons/close/close";
import GoBack from "@/components/buttons/goBack";
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
        <GoBack />
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
              <Close
                onClick={() => {
                  remove(item._id.toString());
                }}
              />
            </section>
          ))
        ) : (
          <p>nothing. . . </p>
        )}
      </section>
      {totalPrice ? <p className="totalprice"> total: {totalPrice}</p> : ""}
      {cart.length ? <button onClick={removeAll}>remove all</button> : ""}
    </>
  );
};

export default Cart;
