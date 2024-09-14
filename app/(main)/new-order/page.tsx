import CustomerForm from "@/app/components/forms/CustomerForm";
import { GlobeDemo } from "./Globe";

const page = () => {
  return (
    <div className="flex w-full  justify-around items-center">
      <div className="flex flex-col items-center justify-evenly">
        <h2 className="text-white text-5xl">Create New Order</h2>
        <CustomerForm />
      </div>
      <GlobeDemo />
    </div>
  );
};

export default page;
