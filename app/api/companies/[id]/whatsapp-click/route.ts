import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{ id: string }>;

export async function GET(_request: Request, { params }: { params: Params }) {
  const { id } = await params;

  try {
    const company = await prisma.company.update({
      where: { id },
      data: {
        whatsappClickCount: {
          increment: 1
        }
      },
      select: {
        name: true,
        whatsapp: true
      }
    });

    return NextResponse.redirect(
      whatsappLink(company.whatsapp, `Hi ${company.name}, I found you on Sign Zim. I need help with signage.`)
    );
  } catch (error) {
    console.error("Unable to track WhatsApp click", error);
    return NextResponse.redirect(new URL("/companies", _request.url));
  }
}
