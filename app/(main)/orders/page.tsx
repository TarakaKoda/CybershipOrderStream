import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";

interface Props {
  searchParams: { status?: string; sortOrder?: string };
}

const OrdersPage = ({ searchParams }: Props) => {
  return (
    <div className="border border-[#333337] p-6 flex-col flex items-center justify-start gap-2  shadow-neumorphic  w-[80vw]  bg-[#0F0F10] h-screen my-5  rounded-xl">
      <OrderFilters searchParams={searchParams} />
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;