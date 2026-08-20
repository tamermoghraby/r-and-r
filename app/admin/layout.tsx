import prisma from "@/lib/prisma";
import AdminShell from "./_components/AdminShell";
import { ToastProvider } from "@/components/Toast";
import { requireAuth } from "@/lib/auth/requireAuth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: { restaurant: true },
  });

  if (!fullUser) {
    throw new Error("User not found");
  }

  return (
    <ToastProvider>
      <AdminShell user={fullUser}>{children}</AdminShell>
    </ToastProvider>
  );
}
