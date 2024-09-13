import { prisma } from "@/prisma/client";
import { orderSchema } from "@/validationSchemas";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// GET endpoint
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = Number(searchParams.get("pageSize") ?? 10);
  const status = searchParams.get("status");

  const where: { status?: OrderStatus } = {};

  function mapStatus(status: string): OrderStatus | undefined {
    switch (status) {
      case "Processing":
        return OrderStatus.Processing;
      case "Shipped":
        return OrderStatus.Shipped;
      case "Delivered":
        return OrderStatus.Delivered;
      case "Cancelled":
        return OrderStatus.Cancelled;
      default:
        return undefined;
    }
  }

  if (status) {
    const enumStatus = mapStatus(status);
    if (enumStatus) {
      where.status = enumStatus;
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalOrders = await prisma.order.count({ where });

    return NextResponse.json(
      {
        data: orders,
        pagination: {
          page,
          pageSize,
          totalPages: Math.ceil(totalOrders / pageSize),
          totalOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validation = orderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Create new order with default status 'Processing'
    const newOrder = await prisma.order.create({
      data: {
        customerName: body.customerName,
        status: OrderStatus.Processing, // Set default status
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}