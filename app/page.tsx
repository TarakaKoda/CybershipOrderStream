"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import OrdersTable from "./components/OrdersTable";
import { Vortex } from "@/components/components/ui/vortex";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders from the backend
    const fetchOrders = async () => {
      const response = await axios.get("/api/orders");
      const data = await response.data;
      setOrders(data.data); // Assuming 'data' is the structure returned by your API
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-screen rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={100}
        baseHue={120}
        className="flex items-center flex-col justify-center w-full h-full">
        <div className="flex flex-col justify-start items-center rounded-md border-red-500 border h-full">
          <Hero />
          <div className="border">
            <OrdersTable data={orders} />
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default OrdersPage;
