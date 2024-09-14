import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  className: string;
  handleClick: () => void;
  title: string | ReactNode;
}

const FilterButton = ({ className, handleClick, title }: Props) => {
  return (
    <Button
      className={`${className} border rounded-lg border-[#333337] transition-colors ease-in-out`}
      onClick={handleClick}>
      {title}
    </Button>
  );
};

export default FilterButton;
