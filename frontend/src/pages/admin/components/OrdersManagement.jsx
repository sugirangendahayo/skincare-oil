// src/pages/admin/components/OrdersManagement.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingOrder, setUpdatingOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch orders: " + err.message);
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id) {
    if (!newStatus) return;
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API_BASE_URL}/api/orders/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
      setUpdatingOrder(null);
      setNewStatus("");
    } catch (err) {
      setError("Failed to update status: " + err.message);
    }
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">
          Orders Management
        </h1>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
        <h1 className="text-2xl font-bold text-white mb-6">
          Orders Management
        </h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Orders Management</h1>
      </div>
      {orders.length === 0 ? (
        <div className="bg-gray-700/30 rounded-xl p-8 text-center border-2 border-dashed border-gray-600">
          <div className="text-4xl mb-4">🛒</div>
          <h3 className="text-white text-lg font-semibold mb-2">
            No Orders Yet
          </h3>
          <p className="text-gray-400">
            Manage customer orders and shipments here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-4">Order ID</th>
                <th className="p-4">User ID</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="p-4">{order.id}</td>
                  <td className="p-4">{order.user_id}</td>
                  <td className="p-4">
                    ${Number(order.total_amount).toFixed(2)}
                  </td>

                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    {updatingOrder === order.id ? (
                      <>
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="bg-gray-800 text-white p-2 rounded mr-2"
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => handleUpdateStatus(order.id)}
                          className="bg-yellow-500 text-black py-1 px-2 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setUpdatingOrder(null)}
                          className="bg-gray-600 text-white py-1 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setUpdatingOrder(order.id);
                          setNewStatus(order.status);
                        }}
                        className="bg-blue-500 text-white py-1 px-2 rounded"
                      >
                        Update Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersManagement;
