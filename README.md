# Ochir — хүргэлт, вэб, AI автоматжуулалтын үйлчилгээний сайт

Next.js 14 (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · GSAP · Prisma + PostgreSQL

## Хуудсууд

| Зам | Тайлбар |
| --- | --- |
| `/` | Нүүр: hero (изометрик хот), үйлчилгээ, "Хэрхэн ажилладаг", багцууд, FAQ, CTA |
| `/services/delivery`, `/services/web`, `/services/automation` | Үйлчилгээний дэлгэрэнгүй, багцууд |
| `/order` | 4 алхамтай захиалгын wizard → `POST /api/orders` |
| `/order/success` | Баталгаажуулалт |
| `/admin` | `ADMIN_PASSWORD`-оор нэвтэрч захиалгын жагсаалт харах, статус солих |

## Бүтэц

```
app/                 хуудсууд, API, OG зураг, robots, sitemap
components/          IsometricCity, Header, Footer, Reveal, home/*, services/*, order/*
data/packages.ts     үйлчилгээ, багцын мэдээлэл (үнэ нэмэх бол энд)
data/faq.ts          түгээмэл асуултууд
lib/                 prisma, admin auth, webhook мэдэгдэл, zod schema, OG
prisma/              schema + migrations
scripts/screenshot.mjs  нүүр болон /order-ийн скриншот (Playwright)
```

### Багц, үнэ засах

`data/packages.ts` файлд багц бүр `priceFrom` талбартай. `null` үед сайт дээр "Үнийн санал авах" / "Үнэ авах" гэж харагдана.
Жишиг үнийг текстээр бичнэ, жишээ нь `priceFrom: "сард 150 000₮-с"` (одоогоор зөвхөн Хүргэлт → Эхлэл багцад).

## Локалд ажиллуулах

```bash
pnpm install
cp .env.example .env          # DATABASE_URL, ADMIN_PASSWORD-оо бөглөнө
pnpm db:migrate               # анх удаа: хүснэгт үүсгэнэ
pnpm dev                      # http://localhost:3000
```

Шалгах:

```bash
pnpm lint && pnpm typecheck && pnpm build
pnpm start -p 3210 &
BASE_URL=http://localhost:3210 pnpm screenshot   # screenshots/ хавтас руу хадгална
```

## Орчны хувьсагч

| Нэр | Заавал | Тайлбар |
| --- | --- | --- |
| `DATABASE_URL` | тийм | PostgreSQL холболт |
| `ADMIN_PASSWORD` | тийм | `/admin` нууц үг (урт, санамсаргүй үг ашиглана) |
| `ORDER_WEBHOOK_URL` | үгүй | Шинэ захиалгын мэдэгдэл. Telegram: `https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>`. Бусад webhook-д `{ text, order }` JSON илгээнэ. |
| `NEXT_PUBLIC_SITE_URL` | үгүй | Үндсэн хаяг (анхдагч `https://ochir.mn`), OG болон sitemap-д ашиглана. Build хийх үед уншина. |

### Telegram bot тохируулах

1. Telegram дээр `@BotFather` → `/newbot` → token авна.
2. Bot-оо мэдэгдэл авах group-д нэмээд (эсвэл bot руу шууд бичээд) `https://api.telegram.org/bot<TOKEN>/getUpdates` хаягаас `chat.id`-г олно.
3. `ORDER_WEBHOOK_URL=https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>` гэж тохируулна.

Webhook алдаа гарсан ч захиалга хадгалагдана, алдаа зөвхөн серверийн log-д бичигдэнэ.

## Railway-д deploy хийх

1. Кодоо GitHub руу push хийнэ.
2. [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo** → энэ repo-г сонгоно. Railway `Dockerfile`-ийг автоматаар олж ашиглана.
3. Нэг project дотор **+ New** → **Database** → **PostgreSQL** нэмнэ.
4. Вэб service-ийн **Variables** хэсэгт:
   - `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (reference variable)
   - `ADMIN_PASSWORD` = урт нууц үг (production-ий нууц үг Railway env дээр байгаа — Railway → ochir → Variables)
   - `ORDER_WEBHOOK_URL` = (заавал биш) Telegram URL
   - `NEXT_PUBLIC_SITE_URL` = `https://ochir.mn`
5. Deploy эхэлнэ. Контейнер асахдаа `prisma migrate deploy`-г өөрөө ажиллуулж хүснэгтүүдийг үүсгэнэ, дараа нь `next start`-ыг Railway-ийн `PORT` дээр асаана.
6. **Settings → Networking → Generate Domain**-оор түр домэйн авч шалгана.

### ochir.mn домэйн холбох

1. Railway → service → **Settings → Networking → Custom Domain** → `ochir.mn` (мөн `www.ochir.mn`) нэмнэ.
2. Railway өгсөн CNAME (болон шаардлагатай бол TXT) бичлэгийг домэйн бүртгэгчийн DNS тохиргоонд нэмнэ. Root домэйнд CNAME хийх боломжгүй бүртгэгч бол ALIAS/ANAME эсвэл Cloudflare DNS ашиглана.
3. SSL сертификатыг Railway автоматаар үүсгэнэ.

## Анхаарах

- Холбоо барих мэдээлэл (Messenger, Instagram, утас) `lib/site.ts`-д байна.
- `/api/orders` IP тус бүрт минутад 5 захиалга хүлээн авна (санах ойд, нэг инстанс). Нуусан `website` талбар spam bot-оос хамгаална.
- Hero-ийн хөдөлгөөн `prefers-reduced-motion`-ийг хүндэтгэнэ, дэлгэцээс гарахад зогсоно. GSAP нь хуудас ачаалсны дараа сул үед ачаалагдана.
