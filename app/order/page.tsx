import type { Metadata } from "next";
import { OrderWizard } from "@/components/order/OrderWizard";

export const metadata: Metadata = {
  title: "Захиалга өгөх",
  description: "Хүргэлт, вэб сайт, AI автоматжуулалтын багцаа сонгоод онлайнаар захиалга өгөөрэй. 24 цагийн дотор холбогдоно.",
  alternates: { canonical: "/order" },
  openGraph: { title: "Захиалга өгөх | Ochir", url: "/order" },
};

export default function OrderPage() {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="mx-auto mb-8 max-w-3xl">
        <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight sm:text-4xl">Багцаа сонгоод илгээгээрэй</h1>
        <p className="mt-3 text-[15px] text-muted sm:text-base">4 алхам, 1 минут. Төлбөр одоо төлөхгүй — эхлээд бид үнийн санал илгээнэ.</p>
      </div>
      <OrderWizard />
    </div>
  );
}
