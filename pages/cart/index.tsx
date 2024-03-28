import { useCartStore } from "@/stores/cart";
import Image from "next/image";
// import classes from './'
const Cart = () => {
  const { cart, remove, removeAll } = useCartStore();
  console.log({ cart });

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.count * item.price;
  }, 0);

  return (
    <>
      <div>
        {cart.length ? (
          cart.map((item) => (
            <>
              <ul key={item._id.toString()}>
                <Image
                  src={item.images[0]?.url}
                  alt={item.name}
                  width={400}
                  height={300}
                />
                <li>name:{item.name}</li>
                <li>each price:{item.price}</li>
                <li>quantity:{item.count}</li>
                <li>each total:{item.count * item.price}</li>
                <hr />
                <button
                  onClick={() => {
                    remove(item._id.toString());
                    close();
                  }}
                >
                  Confirm Delete
                </button>
              </ul>
            </>
          ))
        ) : (
          <p>nothing. . . </p>
        )}
      </div>
      <p className="totalprice">{totalPrice ? totalPrice : ""}</p>
      {cart.length ? <button onClick={removeAll}>remove all</button> : ""}
    </>
  );
};

export default Cart;
