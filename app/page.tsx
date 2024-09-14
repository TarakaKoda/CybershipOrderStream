"use client";
import { Vortex } from "@/components/aceternity-ui/vortex";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import OrdersTable from "./components/OrdersTable";
import OrderFilters from "./components/OrderFilters";

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
        <div className="flex flex-col justify-start items-center rounded-md  pt-5 w-full h-full">
          <Hero />
          <div className="border border-[#333337] p-6 flex-col flex items-center justify-start gap-2  shadow-neumorphic  w-[80vw] bg-[#0F0F10] h-screen my-5  rounded-xl">
            <OrderFilters />
            <OrdersTable data={orders} />
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default OrdersPage;
