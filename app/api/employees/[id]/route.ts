import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const employee = await prisma.employee.findUnique({ where: { id: params.id } })
  if (!employee) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(employee)
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const data = await req.json()
  const employee = await prisma.employee.update({
    where: { id: params.id },
    data
  })
  return NextResponse.json({ success: true, employee })
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  await prisma.employee.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
