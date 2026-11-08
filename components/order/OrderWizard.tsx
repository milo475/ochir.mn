"use client";

import { AnimatePresence, m } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  PRICE_PLACEHOLDER,
  getPackage,
  packagesFor,
  serviceSlugs,
  services,
  type ServiceSlug,
} from "@/data/packages";
import { PHONE_RE } from "@/lib/order-schema";
import { ServiceIcon } from "@/components/ServiceIcon";

const STEPS = ["Үйлчилгээ", "Багц", "Мэдээлэл", "Баталгаажуулах"] as const;

interface Info {
  businessName: string;
  socialLink: string;
  phone: string;
  dailyOrders: string;
  website: string; // honeypot
}

type Errors = Partial<Record<keyof Info | "services" | "packages" | "form", string>>;

const variants = {
  enter: (dir: number) => ({ x: dir * 48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -48, opacity: 0 }),
};

export function OrderWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState<ServiceSlug[]>([]);
  const [chosen, setChosen] = useState<Partial<Record<ServiceSlug, string>>>({});
  const [info, setInfo] = useState<Info>({ businessName: "", socialLink: "", phone: "", dailyOrders: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // ?service=delivery&package=delivery-growth — багцын картаас ирсэн бол урьдчилан сонгоно
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const svc = q.get("service");
    const pkg = q.get("package");
    if (svc && (serviceSlugs as string[]).includes(svc)) {
      const slug = svc as ServiceSlug;
      setSelected([slug]);
      const p = pkg ? getPackage(pkg) : undefined;
      if (p && p.service === slug) setChosen({ [slug]: p.id });
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    const top = headingRef.current?.closest("section")?.getBoundingClientRect().top ?? 0;
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 80, behavior: "smooth" });
  }, [step]);

  const hasDelivery = selected.includes("delivery");

  function toggleService(slug: ServiceSlug) {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : serviceSlugs.filter((s) => s === slug || prev.includes(s))));
    setErrors((e) => ({ ...e, services: undefined }));
  }

  function validate(s: number): Errors {
    const e: Errors = {};
    if (s === 0 && selected.length === 0) e.services = "Дор хаяж нэг үйлчилгээ сонгоно уу";
    if (s === 1 && selected.some((slug) => !chosen[slug])) e.packages = "Сонгосон үйлчилгээ бүрт багц сонгоно уу";
    if (s === 2) {
      if (info.businessName.trim().length < 2) e.businessName = "Бизнесийн нэрээ оруулна уу";
      if (info.socialLink.trim().length < 3) e.socialLink = "Instagram эсвэл Facebook линкээ оруулна уу";
      if (!PHONE_RE.test(info.phone.trim())) e.phone = "8 оронтой утасны дугаар оруулна уу";
      if (hasDelivery) {
        const n = Number(info.dailyOrders);
        if (info.dailyOrders.trim() === "" || !Number.isInteger(n) || n < 0) e.dailyOrders = "Өдрийн дундаж захиалгын тоог оруулна уу";
      }
    }
    return e;
  }

  function go(next: number) {
    if (next > step) {
      const e = validate(step);
      setErrors(e);
      if (Object.keys(e).length) return;
    } else {
      setErrors({});
    }
    setDir(next > step ? 1 : -1);
    setStep(next);
  }

  async function submit() {
    for (const s of [0, 1, 2]) {
      const e = validate(s);
      if (Object.keys(e).length) {
        setErrors(e);
        setDir(-1);
        setStep(s);
        return;
      }
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          services: selected,
          packages: selected.map((s) => chosen[s]),
          businessName: info.businessName.trim(),
          socialLink: info.socialLink.trim(),
          phone: info.phone.trim(),
          dailyOrders: hasDelivery ? Number(info.dailyOrders) : null,
          website: info.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { id?: string; error?: string };
      if (!res.ok || !data.id) throw new Error(data.error || "Захиалга илгээхэд алдаа гарлаа");
      router.push(`/order/success?id=${encodeURIComponent(data.id)}`);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Алдаа гарлаа. Дахин оролдоно уу." });
      setSubmitting(false);
    }
  }

  const set = (k: keyof Info) => (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((v) => ({ ...v, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  return (
    <section className="card mx-auto max-w-3xl overflow-hidden">
      {/* Алхмын явц */}
      <ol className="grid grid-cols-4 border-b border-line" aria-label="Захиалгын алхмууд">
        {STEPS.map((label, i) => (
          <li key={label} className="relative px-1 py-3.5 text-center" aria-current={i === step ? "step" : undefined}>
            <span
              className={`mx-auto grid h-7 w-7 place-items-center rounded-full text-xs font-bold transition-colors ${
                i < step ? "bg-accent text-bg" : i === step ? "border-2 border-accent text-accent" : "border border-line text-muted"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </span>
            <span className={`mt-1.5 block truncate text-[11px] sm:text-xs ${i === step ? "text-ink" : "text-muted"}`}>{label}</span>
            <span
              className="absolute bottom-0 left-0 h-0.5 bg-accent transition-[width] duration-500"
              style={{ width: i < step ? "100%" : i === step ? "50%" : "0%" }}
              aria-hidden="true"
            />
          </li>
        ))}
      </ol>

      <div className="relative min-h-[420px] overflow-hidden p-5 sm:p-8">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <m.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="contents">
                  <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                    Ямар үйлчилгээ хэрэгтэй вэ?
                  </h2>
                </legend>
                <p className="mt-1.5 text-sm text-muted">Нэг буюу хэд хэдийг сонгож болно.</p>
                <div className="mt-6 grid gap-3">
                  {services.map((s) => {
                    const on = selected.includes(s.slug);
                    return (
                      <label
                        key={s.slug}
                        className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                          on ? "border-accent bg-accent-soft" : "border-line hover:border-muted/50"
                        }`}
                      >
                        <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggleService(s.slug)} />
                        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${on ? "bg-accent text-bg" : "bg-bg text-accent"}`}>
                          <ServiceIcon slug={s.slug} className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{s.title}</span>
                          <span className="mt-0.5 block text-sm leading-snug text-muted">{s.short}</span>
                        </span>
                        <span
                          className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md border text-[11px] font-bold peer-focus-visible:ring-2 peer-focus-visible:ring-accent ${
                            on ? "border-accent bg-accent text-bg" : "border-muted/50"
                          }`}
                          aria-hidden="true"
                        >
                          {on ? "✓" : ""}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <FieldError msg={errors.services} />
              </fieldset>
            )}

            {step === 1 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                  Багцаа сонгоно уу
                </h2>
                <p className="mt-1.5 text-sm text-muted">Үнийг таны хэрэгцээнд тулгуурлан санал болгоно.</p>
                <div className="mt-6 space-y-7">
                  {selected.map((slug) => {
                    const svc = services.find((s) => s.slug === slug)!;
                    return (
                      <fieldset key={slug}>
                        <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-muted">
                          <ServiceIcon slug={slug} className="h-4 w-4 text-accent" />
                          {svc.title}
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-3">
                          {packagesFor(slug).map((p) => {
                            const on = chosen[slug] === p.id;
                            return (
                              <label
                                key={p.id}
                                className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition-colors ${
                                  on ? "border-accent bg-accent-soft" : "border-line hover:border-muted/50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`pkg-${slug}`}
                                  className="peer sr-only"
                                  checked={on}
                                  onChange={() => {
                                    setChosen((c) => ({ ...c, [slug]: p.id }));
                                    setErrors((e) => ({ ...e, packages: undefined }));
                                  }}
                                />
                                <span className="flex items-center justify-between gap-2">
                                  <span className="font-semibold">{p.name}</span>
                                  <span
                                    className={`h-4 w-4 shrink-0 rounded-full border-2 peer-focus-visible:ring-2 ${on ? "border-accent bg-accent shadow-[inset_0_0_0_3px_#111A2E]" : "border-muted/50"}`}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="mt-1 text-xs text-muted">{p.tagline}</span>
                                <ul className="mt-3 space-y-1 text-[13px] leading-snug">
                                  {p.features.slice(0, 3).map((f) => (
                                    <li key={f} className="flex gap-1.5">
                                      <span className="text-accent" aria-hidden="true">•</span>
                                      {f}
                                    </li>
                                  ))}
                                </ul>
                                <span className="mt-3 text-xs font-semibold text-accent">{p.priceFrom ?? PRICE_PLACEHOLDER}</span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    );
                  })}
                </div>
                <FieldError msg={errors.packages} />
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                  Бизнесийн мэдээлэл
                </h2>
                <p className="mt-1.5 text-sm text-muted">Бид энэ мэдээллээр тантай холбогдоно.</p>
                <div className="mt-6 grid gap-4">
                  <Field label="Бизнесийн нэр" id="businessName" error={errors.businessName}>
                    <input id="businessName" className="field" autoComplete="organization" value={info.businessName} onChange={set("businessName")} placeholder="Жишээ: Nomin Style" aria-invalid={!!errors.businessName} aria-describedby={errors.businessName ? "businessName-err" : undefined} />
                  </Field>
                  <Field label="Instagram / Facebook линк" id="socialLink" error={errors.socialLink}>
                    <input id="socialLink" className="field" inputMode="url" value={info.socialLink} onChange={set("socialLink")} placeholder="instagram.com/таны_дэлгүүр" aria-invalid={!!errors.socialLink} aria-describedby={errors.socialLink ? "socialLink-err" : undefined} />
                  </Field>
                  <Field label="Утасны дугаар" id="phone" error={errors.phone}>
                    <input id="phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={info.phone} onChange={set("phone")} placeholder="9911 2233" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-err" : undefined} />
                  </Field>
                  {hasDelivery && (
                    <Field label="Өдөрт дунджаар хэдэн захиалга гардаг вэ?" id="dailyOrders" error={errors.dailyOrders}>
                      <input id="dailyOrders" className="field" type="number" min={0} inputMode="numeric" value={info.dailyOrders} onChange={set("dailyOrders")} placeholder="Жишээ: 12" aria-invalid={!!errors.dailyOrders} aria-describedby={errors.dailyOrders ? "dailyOrders-err" : undefined} />
                    </Field>
                  )}
                  {/* spam хамгаалалт — харагдахгүй */}
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="website">Вэбсайт</label>
                    <input id="website" tabIndex={-1} autoComplete="off" value={info.website} onChange={set("website")} />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 ref={headingRef} tabIndex={-1} className="text-xl font-bold outline-none sm:text-2xl">
                  Захиалгаа шалгана уу
                </h2>
                <p className="mt-1.5 text-sm text-muted">Бүх зүйл зөв бол илгээнэ үү. Бид 24 цагийн дотор холбогдоно.</p>
                <dl className="mt-6 divide-y divide-line rounded-xl border border-line">
                  {selected.map((slug) => {
                    const p = getPackage(chosen[slug] ?? "");
                    return (
                      <Row key={slug} label={services.find((s) => s.slug === slug)!.title} onEdit={() => go(1)}>
                        {p?.name} <span className="text-muted">· {p?.priceFrom ?? PRICE_PLACEHOLDER}</span>
                      </Row>
                    );
                  })}
                  <Row label="Бизнес" onEdit={() => go(2)}>{info.businessName}</Row>
                  <Row label="Сошиал" onEdit={() => go(2)}><span className="break-all">{info.socialLink}</span></Row>
                  <Row label="Утас" onEdit={() => go(2)}>{info.phone}</Row>
                  {hasDelivery && <Row label="Өдрийн захиалга" onEdit={() => go(2)}>~{info.dailyOrders}</Row>}
                </dl>
                {errors.form && (
                  <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {errors.form}
                  </p>
                )}
              </div>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-bg/40 p-4 sm:px-8">
        {step > 0 ? (
          <button type="button" className="btn-ghost" onClick={() => go(step - 1)} disabled={submitting}>
            ← Буцах
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button type="button" className="btn-primary min-w-[140px]" onClick={() => go(step + 1)}>
            Үргэлжлүүлэх
          </button>
        ) : (
          <button type="button" className="btn-primary min-w-[160px]" onClick={submit} disabled={submitting} aria-busy={submitting}>
            {submitting ? "Илгээж байна…" : "Захиалга илгээх"}
          </button>
        )}
      </div>
    </section>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      <FieldError msg={error} id={`${id}-err`} />
    </div>
  );
}

function FieldError({ msg, id }: { msg?: string; id?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {msg}
    </p>
  );
}

function Row({ label, children, onEdit }: { label: string; children: React.ReactNode; onEdit: () => void }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5">
      <dt className="w-28 shrink-0 text-sm text-muted sm:w-36">{label}</dt>
      <dd className="min-w-0 flex-1 text-[15px] font-medium">{children}</dd>
      <button type="button" onClick={onEdit} className="text-xs font-semibold text-accent hover:underline">
        Засах
      </button>
    </div>
  );
}
