import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const task = await prisma.task.findUnique({ where: { id: params.id } })
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(task)
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const data = await req.json()
  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data: {
      ...data,
      updatedAt: new Date()
    }
  })
  return NextResponse.json({ success: true, task: updatedTask })
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  await prisma.task.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
