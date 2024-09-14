import OrderFilters from "../../components/OrderFilters";
import OrdersTable from "../../components/OrdersTable";

const OrdersPage: React.FC = () => {
  return (
    <div className="border border-[#333337] p-6 flex-col flex items-center justify-start gap-2  shadow-neumorphic  w-[80vw] bg-[#0F0F10] h-screen my-5  rounded-xl">
      <OrderFilters />
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
