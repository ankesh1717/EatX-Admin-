import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import deleveryBox from "../../assets/deleveryBox.png";

const Orders = () => {
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.get("https://eatx-api-1.onrender.com/api/orders/all");
    setData(response.data);
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.patch(
      `https://eatx-api-1.onrender.com/api/orders/status/${orderId}?status=${event.target.value}`
    );
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <table className="table table-responsive">
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={deleveryBox} alt="" height={48} width={48} />
                    </td>
                    <td className="col-6">
                      <div>
                        {order.orderItems.map((item, index) => {
                          if (index === order.orderItems.length - 1) {
                            return item.name + " x " + item.quantity;
                          } else {
                            return item.name + " x " + item.quantity + ", ";
                          }
                        })}
                      </div>
                      <div className="">
                        {order.userAddress}
                      </div>
                    </td>

                    <td>
                      {" "}
                      &#x20B9;
                      {order.amount.toFixed(2)}
                    </td>
                    <td>Items: {order.orderItems.length}</td>
                    
                    <td>
                      <select
                        className="form-control"
                        onChange={(event) => statusHandler(event, order.id)}
                        value={order.orderStatus}
                      >
                        <option value="Food Preparing">Food Preparing</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
