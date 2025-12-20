import prisma from "@/lib/prisma";

export async function DELETE() {
  await prisma.user.deleteMany({});
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
