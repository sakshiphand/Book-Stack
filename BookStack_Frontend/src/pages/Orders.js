import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index}>
            <h3>Order #{index + 1}</h3>
            <p>Total Price: ${order.totalPrice}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.title} - ${item.price} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;