import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="text-6xl font-extrabold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-bold">Хуудас олдсонгүй</h1>
        <p className="mt-2 text-muted">Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.</p>
        <Link href="/" className="btn-primary mt-8">Нүүр хуудас руу</Link>
      </div>
    </div>
  );
}
