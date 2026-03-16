import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Image src="/images/auth-bg.png" alt="" fill className="object-cover" priority />
      <div className="relative z-10 flex items-center justify-center min-h-screen py-10">
        {children}
      </div>
    </div>
  );
}