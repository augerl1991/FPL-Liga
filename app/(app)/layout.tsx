import { AuthProvider } from "@/app/providers";
import Nav from "@/app/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </AuthProvider>
  );
}
