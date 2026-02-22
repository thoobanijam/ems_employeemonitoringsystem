import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const mail = await prisma.hRMail.findUnique({ where: { id: params.id } })
  if (!mail) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(mail)
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const data = await req.json()
  const mail = await prisma.hRMail.update({
    where: { id: params.id },
    data
  })
  return NextResponse.json({ success: true, mail })
}

export async function DELETE(req: NextRequest, context: any) {
  const { params } = context;
  await prisma.hRMail.delete({ where: { id: params.id } })
  return NextResponse.json({ success: true })
}
