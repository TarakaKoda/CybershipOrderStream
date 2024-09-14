import { Button } from "@/components/ui/button";
import Link from "next/link";

const AddCustomerButton = () => {
  return (
    <Link href={"/new-order"}>
      <Button className="w-10 h-8 text-xl text-black bg-white hover:bg-[#0F0F10] border rounded-lg border-[#333337]  hover:text-white">
        +
      </Button>
    </Link>
  );
};

export default AddCustomerButton;
