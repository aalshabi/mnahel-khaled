"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  MessageCircle,
  Star,
  CheckCircle2,
  BadgeCheck,
  Gift,
  Sparkles,
  ChevronDown,
  Leaf,
  Package,
  MapPin,
  Beaker,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WHATSAPP_URL = "https://wa.me/966566129606";
const STORE_URL = "https://salla.sa/mnahel.khaled";

const trustBadges = [
  { icon: ShieldCheck, text: "جودة مضمونة" },
  { icon: Truck, text: "شحن سريع داخل المملكة" },
  { icon: BadgeCheck, text: "متجر سعودي موثوق" },
  { icon: MessageCircle, text: "طلب مباشر عبر واتساب" },
];

const advantages = [
  {
    title: "مناحل متنقلة حسب مواسم التزهير",
    desc: "نتتبع مواسم السدر والسمرة والطلح لنقدّم عسلًا من مصدره وفي وقته الأفضل.",
    icon: MapPin,
  },
  {
    title: "عسل طبيعي من جازان",
    desc: "هوية محلية أصيلة ومصدر واضح يمنح العميل ثقة أكبر في المنتج وجودته.",
    icon: Leaf,
  },
  {
    title: "تعبئة وتوصيل باحتراف",
    desc: "تغليف مناسب للهدية وللاستخدام الشخصي مع تجربة شراء مباشرة وواضحة.",
    icon: Package,
  },
  {
    title: "ثقة تقلل تردد الشراء",
    desc: "مخصص لإبراز التقييمات، السياسات، الضمان، والفحص المخبري عند توفره.",
    icon: Beaker,
  },
];

const honeyTypes = [
  {
    name: "عسل السدر",
    taste: "غني وعميق",
    use: "للإهداء والاستخدام اليومي الفاخر",
    fit: "للباحث عن الطعم الأصيل والقيمة الأعلى",
    density: "متوسطة إلى عالية",
    badge: "الأكثر طلبًا",
  },
  {
    name: "عسل السمرة",
    taste: "قوي ومميز",
    use: "لمن يفضّل النكهة المركزة",
    fit: "للذوّاقة ومحبي العسل الداكن",
    density: "عالية",
    badge: "نكهة أقوى",
  },
  {
    name: "عسل الطلح",
    taste: "متوازن ومحبوب",
    use: "للتجربة الأولى والاستخدام المتكرر",
    fit: "لمن يريد خيارًا عمليًا ومميزًا",
    density: "متوسطة",
    badge: "مناسب للتجربة",
  },
  {
    name: "عسل السلام",
    taste: "أخف وألطف",
    use: "لمن يفضّل الطعم الناعم",
    fit: "مناسب للأسرة والتقديم اليومي",
    density: "خفيفة إلى متوسطة",
    badge: "طعم ألطف",
  },
];

const offers = [
  {
    title: "باقة التذوق",
    subtitle: "3 أنواع مختارة بعبوات أصغر",
    desc: "أفضل نقطة دخول للعميل الجديد الذي يريد المقارنة واختيار نكهته المفضلة.",
    tag: "الأفضل للتحويل الأول",
  },
  {
    title: "باقة الهدية الفاخرة",
    subtitle: "عسل مختار بتغليف أنيق",
    desc: "مناسبة للهدايا الموسمية والطلبات الراقية مع ملحقات بسيطة تضيف قيمة أكبر.",
    tag: "مناسبة للهدايا",
  },
  {
    title: "عرض الكمية",
    subtitle: "اشترِ أكثر ووفر أكثر",
    desc: "يرفع متوسط الطلب ويمنح العميل سببًا واضحًا للشراء الآن بدل التأجيل.",
    tag: "يرفع متوسط السلة",
  },
];

const testimonials = [
  {
    name: "عميل موثق",
    text: "مكان مخصص لعرض تقييم حقيقي يركز على الطعم، الثقة، وسرعة التوصيل.",
  },
  {
    name: "عميل متكرر",
    text: "مكان مخصص لعرض تجربة شراء ثانية أو ثالثة تعزز الثقة وتقلل التردد.",
  },
  {
    name: "طلب هدية",
    text: "مكان مخصص لتقييم يوضح جودة التغليف وملاءمة المنتج للهدايا.",
  },
];

const faqs = [
  {
    q: "كيف أعرف أن العسل أصلي؟",
    a: "تُبنى هذه الصفحة على إبراز المصدر بوضوح، صور المناحل، سياسة الضمان، والتقارير أو الفحص المخبري عند توفره، حتى تكون الثقة جزءًا ظاهرًا من التجربة لا وعدًا عامًا فقط.",
  },
  {
    q: "ما الفرق بين السدر والسمرة والطلح؟",
    a: "تمت إضافة قسم مقارنة واضح يساعد العميل على اختيار النوع بحسب الطعم والاستخدام ودرجة الكثافة بدل تركه يتردد أمام أسماء المنتجات فقط.",
  },
  {
    q: "هل التوصيل متاح لكل مناطق المملكة؟",
    a: "هذا القسم مخصص لعرض سياسة الشحن بشكل مباشر وواضح داخل الصفحة، مع مدة التوصيل وحد الشحن المجاني إن وجد.",
  },
  {
    q: "هل يوجد واتساب للطلب السريع؟",
    a: "نعم، تم وضع زر واتساب بارز في أكثر من موضع داخل الصفحة لتسهيل التواصل وتقليل فقدان العملاء المترددين.",
  },
  {
    q: "ما أفضل خيار للتجربة الأولى؟",
    a: "باقة التذوق هي الأنسب عادةً للعميل الجديد لأنها تقلل حاجز التجربة وتسمح له بالتعرف على أكثر من نوع قبل الشراء الأكبر.",
  },
];

function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm text-amber-300">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-base leading-8 text-stone-300 md:text-lg">
          {desc}
        </p>
      )}
    </div>
  );
}

function FAQItem({
  item,
  open,
  onClick,
}: {
  item: { q: string; a: string };
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-right transition hover:bg-white/[0.07]"
    >
      <div className="flex items-center justify-between gap-4">
        <ChevronDown
          className={`h-5 w-5 text-amber-300 transition ${open ? "rotate-180" : ""}`}
        />
        <div className="text-base font-medium text-white md:text-lg">
          {item.q}
        </div>
      </div>
      {open && (
        <p className="mt-4 pl-9 text-sm leading-7 text-stone-300 md:text-base">
          {item.a}
        </p>
      )}
    </button>
  );
}

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const stats = useMemo(
    () => [
      "مناحل متنقلة في مواسم التزهير",
      "خيارات مناسبة للتجربة والإهداء",
      "رحلة شراء أوضح وأكثر إقناعًا",
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[#0a0908] text-white">
      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-amber-400/20 bg-black/85 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-7xl gap-3 p-3">
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button className="h-12 w-full rounded-xl bg-amber-500 text-black hover:bg-amber-400">
              اطلب الآن
            </Button>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button
              variant="outline"
              className="h-12 w-full rounded-xl border-amber-400/40 bg-transparent text-amber-200 hover:bg-amber-500/10"
            >
              واتساب
            </Button>
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-amber-400/30 bg-amber-500/10 text-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <span className="text-xl font-bold">م</span>
            </div>
            <div>
              <div className="text-lg font-bold">مناحل خالد</div>
              <div className="text-sm text-stone-400">عسل طبيعي من جازان</div>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="rounded-xl border-amber-400/40 bg-transparent text-amber-200 hover:bg-amber-500/10"
              >
                اطلب عبر واتساب
              </Button>
            </a>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
              <Button className="rounded-xl bg-amber-500 text-black hover:bg-amber-400">
                تسوق الآن
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_38%),radial-gradient(circle_at_bottom_left,_rgba(180,83,9,0.16),_transparent_30%)]" />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-200">
                <Sparkles className="h-4 w-4" />
                عسل طبيعي من مناحلنا المتنقلة في جازان
              </div>

              <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
                من الخلية إلى بيتك…
                <span className="block text-amber-300">
                  عسل سعودي فاخر بطعم أصيل وثقة أوضح
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300 md:text-xl">
                ننتقل مع مواسم التزهير لنقدّم لك عسلًا طبيعيًا من مصدره، بتجربة
                شراء أوضح، وعروض أنسب للتجربة والإهداء، ومحتوى يجيب عن سؤال
                العميل قبل أن يتردد.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="h-12 rounded-xl bg-amber-500 px-7 text-base font-bold text-black hover:bg-amber-400">
                    تسوق العسل الآن
                  </Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-amber-400/40 bg-transparent px-7 text-base text-amber-200 hover:bg-amber-500/10"
                  >
                    اطلب عبر واتساب
                  </Button>
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {trustBadges.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
                    >
                      <Icon className="mx-auto mb-2 h-5 w-5 text-amber-300" />
                      <div className="text-sm text-stone-200">{badge.text}</div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2rem] bg-amber-500/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/20 bg-gradient-to-b from-stone-900 to-black p-5 shadow-2xl">
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                  <div>
                    <div className="text-sm text-stone-400">العرض المقترح</div>
                    <div className="font-bold text-white">
                      باقة التذوق — 3 أنواع مختارة
                    </div>
                  </div>
                  <div className="rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-black">
                    الأكثر إقناعًا
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,#1f1400,#0b0b0b)] p-5">
                    <div className="mb-4 h-56 rounded-[1.25rem] border border-amber-300/20 bg-[radial-gradient(circle_at_top,#d6a63f_0%,#5a3d08_30%,#0a0908_70%)]" />
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold">عسل السدر</div>
                        <div className="text-sm text-stone-400">
                          نكهة أصيلة ومظهر فاخر
                        </div>
                      </div>
                      <div className="rounded-full border border-amber-400/30 px-3 py-1 text-sm text-amber-200">
                        250 جم
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="rounded-[1.5rem] border-white/10 bg-white/5 text-white">
                      <CardContent className="p-5">
                        <div className="mb-2 flex items-center gap-2 text-amber-300">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-semibold">
                            ما الذي ستجده فوق الطية الأولى؟
                          </span>
                        </div>
                        <ul className="space-y-2 text-sm leading-7 text-stone-300">
                          <li>عنوان واضح يبيع الأصالة والمصدر.</li>
                          <li>CTA مباشر + زر واتساب واضح.</li>
                          <li>شارات ثقة وسرعة شحن ودفع آمن.</li>
                          <li>عرض رئيسي يقلل تردد التجربة الأولى.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="rounded-[1.5rem] border-white/10 bg-white/5 text-white">
                      <CardContent className="p-5">
                        <div className="mb-3 text-lg font-bold">
                          لماذا هذه الصفحة أقوى من الصفحة التقليدية؟
                        </div>
                        <div className="grid gap-2">
                          {stats.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-sm text-stone-300"
                            >
                              <Star className="h-4 w-4 text-amber-300" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-white/10 bg-[#0f0d0c]">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 py-5 text-sm text-stone-300 md:grid-cols-4 md:px-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-amber-300" /> معروف ✓
            </div>
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-5 w-5 text-amber-300" /> ضمان جودة ✓
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-amber-300" /> شحن سريع ✓
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-amber-300" /> طلب واتساب ✓
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle
            eyebrow="لماذا مناحل خالد؟"
            title="ميزة المصدر الحقيقي تتحول هنا إلى سبب شراء واضح"
            desc="الهدف من هذا القسم هو تحويل الأصالة من معلومة مبهمة إلى عرض قيمة يفهمه العميل بسرعة ويثق به أكثر."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {advantages.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Card
                  key={idx}
                  className="rounded-[1.75rem] border-white/10 bg-white/5 text-white"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex rounded-2xl bg-amber-500/10 p-3 text-amber-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="mb-2 text-xl font-bold">{item.title}</div>
                    <p className="text-sm leading-7 text-stone-300">
                      {item.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Offers */}
        <section className="bg-[#0d0b0a] py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionTitle
              eyebrow="العرض المقترح"
              title="ابدأ بباقة تقلل التردد وتزيد احتمال الشراء"
              desc="العرض الرئيسي هنا مصمم للعميل المتردد: بدل أن يختار نوعًا واحدًا دون معرفة كافية، نمنحه تجربة أذكى وأكثر إقناعًا."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {offers.map((offer, idx) => (
                <Card
                  key={idx}
                  className={`rounded-[1.75rem] border ${idx === 0 ? "border-amber-400/40 bg-[linear-gradient(180deg,rgba(245,158,11,0.12),rgba(255,255,255,0.04))]" : "border-white/10 bg-white/5"} text-white`}
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="text-lg font-bold">{offer.title}</div>
                      <span className="rounded-full border border-amber-400/30 px-3 py-1 text-xs text-amber-200">
                        {offer.tag}
                      </span>
                    </div>
                    <div className="mb-2 text-stone-200">{offer.subtitle}</div>
                    <p className="mb-6 text-sm leading-7 text-stone-300">
                      {offer.desc}
                    </p>
                    <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        className={`w-full rounded-xl ${idx === 0 ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-white/10 text-white hover:bg-white/15"}`}
                      >
                        {idx === 0 ? "اختر هذا العرض" : "اعرف أكثر"}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Honey comparison */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle
            eyebrow="مقارنة الأنواع"
            title="ساعد العميل على اختيار النوع المناسب بدل تركه يحتار"
            desc="هذا القسم يعالج واحدة من أهم فجوات متاجر العسل: عرض أسماء الأنواع دون تفسير بسيط يقرّب القرار من العميل."
          />

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-x-reverse md:divide-y-0">
              {honeyTypes.map((item, idx) => (
                <div key={idx} className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-xl font-bold text-white">
                      {item.name}
                    </div>
                    <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-200">
                      {item.badge}
                    </span>
                  </div>
                  <div className="space-y-3 text-sm leading-7 text-stone-300">
                    <div>
                      <span className="text-white">الطعم:</span> {item.taste}
                    </div>
                    <div>
                      <span className="text-white">الاستخدام:</span> {item.use}
                    </div>
                    <div>
                      <span className="text-white">يناسب:</span> {item.fit}
                    </div>
                    <div>
                      <span className="text-white">الكثافة:</span>{" "}
                      {item.density}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand story */}
        <section className="bg-[#0d0b0a] py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
            <div>
              <SectionTitle
                eyebrow="قصة العلامة"
                title="نحن لا نبيع اسم منتج فقط… بل رحلة مصدر واضحة"
                desc="في هذه الصفحة، تم تحويل قصة المناحل المتنقلة في جازان إلى جزء بيعي حقيقي: مصدر واضح، توقيت مدروس، ونقاء يشعر به العميل قبل أن يصل المنتج إليه."
              />
              <p className="text-base leading-8 text-stone-300 md:text-lg">
                مناحل خالد تنطلق من فكرة بسيطة لكن قوية: أن يكون العسل مرتبطًا
                بموسمه ومصدره لا بمجرد اسم على العبوة. لهذا تتنقل المناحل وفق
                مواسم التزهير لنقدّم عسلًا أقرب إلى أصله، ونبني تجربة شراء أوضح،
                أصدق، وأكثر إقناعًا للعميل الذي يبحث عن الجودة قبل أي شيء.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-xl bg-amber-500 text-black hover:bg-amber-400">
                    استكشف المنتجات
                  </Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="rounded-xl border-amber-400/40 bg-transparent text-amber-200 hover:bg-amber-500/10"
                  >
                    اطلب عبر واتساب
                  </Button>
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-56 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,#221806,#0b0b0b)]" />
              <div className="h-56 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,#191919,#0b0b0b)]" />
              <div className="h-40 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,#271a04,#0b0b0b)] sm:col-span-2" />
            </div>
          </div>
        </section>

        {/* Trust & quality */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle
            eyebrow="الثقة والجودة"
            title="كيف نخفف خوف العميل من غش العسل؟"
            desc="بدل ترك عناصر الثقة في صفحات متفرقة أو غير ظاهرة، يتم جمعها هنا في قسم واضح ومقنع داخل الصفحة نفسها."
          />

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="rounded-[1.75rem] border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-5 text-2xl font-bold">
                  عناصر الثقة الأساسية
                </div>
                <div className="grid gap-3 text-sm leading-7 text-stone-300">
                  {[
                    "مكان واضح لشهادة الفحص المخبري أو ما يثبت الجودة عند توفره.",
                    "سياسة استرجاع وشحن واضحة تقلل التردد قبل الدفع.",
                    "إبراز التسجيل في معروف والدفع الآمن بشكل مباشر.",
                    "صور حقيقية من المناحل والتعبئة بدل الاعتماد على الوصف فقط.",
                  ].map((line, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-300" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[1.75rem] border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-5 text-2xl font-bold">
                  ضمان وجودة بصياغة تجارية
                </div>
                <p className="mb-5 text-sm leading-7 text-stone-300">
                  من المصدر إلى التعبئة والتوصيل، صُمم هذا القسم ليجيب عن سؤال
                  العميل مباشرة: لماذا أثق بهذا المنتج الآن؟
                </p>
                <div className="rounded-[1.25rem] border border-amber-400/20 bg-amber-500/10 p-5 text-amber-100">
                  &ldquo;نقدّم لك عسلًا من مصدر واضح، مع تجربة شراء أوضح،
                  ووسائل ثقة ظاهرة تساعدك على اتخاذ القرار بثقة أكبر.&rdquo;
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-[#0d0b0a] py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <SectionTitle
              eyebrow="آراء العملاء"
              title="مساحة جاهزة لإظهار التقييمات بدل ترك الثقة غائبة"
              desc="هذه البطاقات مصممة كقوالب جاهزة لاستبدالها بمراجعات حقيقية وصور أو أسماء أولية عند جمع التقييمات الفعلية."
            />

            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((item, idx) => (
                <Card
                  key={idx}
                  className="rounded-[1.75rem] border-white/10 bg-white/5 text-white"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1 text-amber-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="mb-5 text-sm leading-7 text-stone-300">
                      &ldquo;{item.text}&rdquo;
                    </p>
                    <div className="font-semibold text-white">{item.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gift section */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionTitle
            eyebrow="الهدايا والمواسم"
            title="اجعل الصفحة تفتح بابًا للاستخدام الشخصي والهدايا معًا"
            desc="إضافة قسم هدايا موسمية لا يزيد جمال الصفحة فقط، بل يوسّع شريحة الطلب ويعطي سببًا إضافيًا للشراء."
          />

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[1.75rem] border-amber-400/20 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),rgba(255,255,255,0.03))] text-white">
              <CardContent className="p-7">
                <div className="mb-4 inline-flex rounded-full bg-amber-500 px-3 py-1 text-sm font-bold text-black">
                  فكرة موسمية
                </div>
                <div className="mb-3 text-3xl font-bold">
                  صندوق هدية عسل فاخر
                </div>
                <p className="mb-6 max-w-2xl text-base leading-8 text-stone-200">
                  ثلاث نكهات مختارة، تغليف أنيق، ورسالة مخصصة عند الطلب. خيار
                  مثالي للهدايا الراقية والمناسبات الموسمية.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-xl bg-black text-amber-300 hover:bg-black/80">
                    <Gift className="ml-2 h-4 w-4" />
                    اطلب باقة هدية
                  </Button>
                </a>
              </CardContent>
            </Card>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 text-xl font-bold text-white">
                ماذا يجب أن يظهر بصريًا هنا؟
              </div>
              <ul className="space-y-3 text-sm leading-7 text-stone-300">
                <li>صور تغليف فاخر واقعي.</li>
                <li>تفاصيل العبوات والمحتوى الداخلي.</li>
                <li>زر طلب سريع أو تخصيص الرسالة.</li>
                <li>إشارة للمواسم والمناسبات.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#0d0b0a] py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <SectionTitle
              eyebrow="الأسئلة الشائعة"
              title="أزل الاعتراضات قبل أن تغادر العميل الصفحة"
              desc="تم وضع الأسئلة هنا بصياغة تزيل التردد وتدعم القرار بدل أن تكون مجرد معلومات جانبية."
            />

            <div className="space-y-3">
              {faqs.map((item, idx) => (
                <FAQItem
                  key={idx}
                  item={item}
                  open={openIndex === idx}
                  onClick={() =>
                    setOpenIndex(openIndex === idx ? -1 : idx)
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-amber-400/20 bg-[linear-gradient(135deg,rgba(245,158,11,0.18),rgba(0,0,0,0.85))] p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-black/30 px-4 py-2 text-sm text-amber-200">
                  قرار الشراء يجب أن يكون أسهل من التردد
                </div>
                <h3 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
                  جرّب العسل الطبيعي من مناحل خالد
                  <span className="block text-amber-200">
                    واختر الباقة الأنسب لك اليوم
                  </span>
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-stone-100 md:text-lg">
                  صُممت هذه الصفحة لتجمع ما يحتاجه العميل في مكان واحد: سبب
                  الشراء، عنصر الثقة، الفرق بين الأنواع، والعرض الذي يسهل
                  القرار.
                </p>
              </div>

              <div className="grid gap-3">
                <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
                  <Button className="h-12 w-full rounded-xl bg-black text-base font-bold text-amber-300 hover:bg-black/80">
                    اطلب الآن
                  </Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="h-12 w-full rounded-xl border-white/20 bg-white/10 text-base text-white hover:bg-white/15"
                  >
                    اطلب عبر واتساب
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Spacer for mobile sticky bar */}
      <div className="h-20 md:hidden" />
    </div>
  );
}
