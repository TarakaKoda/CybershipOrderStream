"use client";
import { Input } from "@/components/aceternity-ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, SearchSchema } from "@/lib/validationSchemas";
import { z } from "zod";
import { useRouter } from "next/navigation";

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const params = new URLSearchParams();

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchCustomer: "",
    },
  });

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (values: z.infer<typeof SearchSchema>) => {
    try {
      if (values) {
        params.append("search", values.searchCustomer);
      }
      router.push(`/orders?${params.toString()}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      {!isOpen ? (
        <Button
          onClick={handleClick}
          className="text-white bg-[#0F0F10] border border-[#333337] hover:bg-white hover:text-black">
          <FaSearch />
        </Button>
      ) : (
        // <Form>form</Form>
        <p>Form</p>
      )}
    </>
  );
};

export default SearchButton;
