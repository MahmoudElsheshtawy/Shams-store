import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Heart,
  ShoppingBag,
  Code,
  Smartphone,
  Globe,
  Info,
  Truck,
  ShieldCheck,
  HelpCircle,
  FileText,
  RotateCcw,
  Ruler,
  X,
  ChevronDown,
  Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  محتوى كل لينك — عدّل النصوص هنا براحتك                             */
/* ------------------------------------------------------------------ */
const LINK_CONTENT = {
  "About Us": {
    title: "من نحن",
    icon: Info,
    subtitle: "تعرّف علينا",
    blocks: [
      {
        type: "p",
        text: "بدأت شمس ستور بفكرة بسيطة: الموضة اليومية لازم تكون شكلها حلو، ومريحة، وبسعر مناسب. بنختار قطع بتجمع بين الترند الحالي والتصميمات الكلاسيكية اللي مبتبطلش.",
      },
      {
        type: "cards",
        items: [
          { title: "اختيار بعناية", text: "كل قطعة بنختارها بإيدينا، مش بنعرض أي حاجة وخلاص." },
          { title: "أسعار عادلة", text: "خامات بجودة عالية بأسعار منطقية." },
          { title: "مناسبة لينا", text: "مقاسات وخامات وتوصيل مظبوطين على احتياجنا في مصر." },
        ],
      },
    ],
  },

  Delivery: {
    title: "التوصيل",
    icon: Truck,
    subtitle: "شحن لكل محافظات مصر",
    blocks: [
      {
        type: "table",
        head: ["المنطقة", "المدة", "رسوم الشحن"],
        rows: [
          ["القاهرة والجيزة", "١–٢ يوم", "٥٠ جنيه"],
          ["الإسكندرية والدلتا", "٢–٣ أيام", "٦٥ جنيه"],
          ["الصعيد والقناة", "٣–٥ أيام", "٨٠ جنيه"],
        ],
      },
      {
        type: "list",
        items: [
          "بنكلمك تليفونياً لتأكيد الأوردر قبل الشحن.",
          "الدفع كاش عند الاستلام  ",
        ],
      },
    ],
  },

  "Privacy Policy": {
    title: "سياسة الخصوصية",
    icon: ShieldCheck,
    subtitle: "إزاي بنحافظ على بياناتك",
    blocks: [
      {
        type: "p",
        text: "بنجمع بس البيانات اللي محتاجينها لتنفيذ طلبك: اسمك، رقم تليفونك، عنوانك، وإيميلك.",
      },
      {
        type: "list",
        items: [
          "بياناتك بتتستخدم للتوصيل وتحديثات الأوردر بس.",
          "مبنبيعش بياناتك ولا بنشاركها مع أي جهة للتسويق.",

        ],
      },
    ],
  },

  FAQ: {
    title: "الأسئلة الشائعة",
    icon: HelpCircle,
    subtitle: "إجابات سريعة",
    blocks: [
      {
        type: "faq",
        items: [
          {
            q: "أطلب إزاي؟",
            a: "ضيف المنتجات للسلة، اكتب بيانات التوصيل وأكّد الطلب. هنتصل بيك لتأكيد الأوردر.",
          },
          {
            q: "أقدر أعدّل أو ألغي الأوردر؟",
            a: "أيوه، طالما لسه ماتشحنش. كلمنا على 01092997107 في أسرع وقت.",
          },
          {
            q: "إيه طرق الدفع المتاحة؟",
            a: "الدفع كاش عند الاستلام ,او..المحافظ الالكترونية .",
            
          },
          {
            q: "أتابع الأوردر إزاي؟",
            a: "فريقنا هيبعتلك حالة الشحنة أول ما الأوردر يتحرك.",
          },
        ],
      },
    ],
  },

  "Terms & Conditions": {
    title: "الشروط والأحكام",
    icon: FileText,
    subtitle: "استخدام شمس ستور",
    blocks: [
      {
        type: "list",
        items: [
          "الأسعار والتوفر ممكن يتغيروا من غير إشعار مسبق.",
          "ألوان المنتجات ممكن تظهر مختلفة شوية على شاشتك.",
          "الأوردر بيبقى نهائي بمجرد ما فريقنا يأكده.",
          "ممكن نلغي أي أوردر مش قادرين ننفذه، وبنرجّع أي مبلغ اتدفع.",
          "كل محتوى الموقع ملك لشمس ستور.",
        ],
      },
    ],
  },

  "Return Policy": {
    title: "سياسة الاسترجاع",
    icon: RotateCcw,
    subtitle: "غيّرت رأيك؟",
    blocks: [
      {
        type: "cards",
        items: [
          { title: "١٤ يوم", text: "تقدر تطلب استرجاع أو استبدال خلال ١٤ يوم من الاستلام." },
          { title: "غير مستعمل", text: "لازم القطعة تكون غير ملبوسة ولا مغسولة وعليها التاج." },
          { title: "استرداد المبلغ", text: "بنرجّع المبلغ خلال ٥–٧ أيام عمل." },
        ],
      },
      {
        type: "p",
        text: "الملابس الداخلية والإكسسوارات ومنتجات الأوكازيون مش بتترجع إلا لو وصلت تالفة أو غلط.",
      },
    ],
  },

  "Size Guide": {
    title: "دليل المقاسات",
    icon: Ruler,
    subtitle: "اعرف مقاسك (بالسنتيمتر)",
    blocks: [
      {
        type: "table",
        head: ["المقاس", "الصدر", "الوسط", "الطول"],
        rows: [
          ["S", "92", "78", "68"],
          ["M", "98", "84", "70"],
          ["L", "104", "90", "72"],
          ["XL", "110", "96", "74"],
          ["XXL", "116", "102", "76"],
        ],
      },
      {
        type: "p",
        text: "لو مقاسك بين مقاسين: خد الأكبر لو عايز لبس واسع، أو الأصغر لو عايزه ضيق شوية.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  مكونات المحتوى                                                     */
/* ------------------------------------------------------------------ */
const Faq = ({ items }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-right text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              {it.q}
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-emerald-600" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <p className="overflow-hidden px-4 text-sm leading-relaxed text-gray-600">
                <span className="block pb-4">{it.a}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Block = ({ block }) => {
  switch (block.type) {
    case "p":
      return <p className="text-sm leading-relaxed text-gray-600 md:text-base">{block.text}</p>;

    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((t) => (
            <li key={t} className="flex items-start gap-3 text-sm text-gray-700 md:text-base">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-3 w-3 text-emerald-600" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      );

    case "cards":
      return (
        <div className="grid gap-3 sm:grid-cols-3">
          {block.items.map((c) => (
            <div key={c.title} className="rounded-2xl bg-gray-50 p-4">
              <p className="text-base font-bold text-gray-900">{c.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.text}</p>
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-gray-100">
          <table className="w-full text-right text-sm">
            <thead className="bg-emerald-50 text-emerald-800">
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {block.rows.map((r) => (
                <tr key={r.join("-")} className="hover:bg-gray-50">
                  {r.map((c, i) => (
                    <td key={i} className={`px-4 py-3 ${i === 0 ? "font-semibold text-gray-900" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "faq":
      return <Faq items={block.items} />;

    default:
      return null;
  }
};

/* ------------------------------------------------------------------ */
/*  البورتال (Modal)                                                   */
/* ------------------------------------------------------------------ */
const InfoPortal = ({ title, onClose }) => {
  const data = LINK_CONTENT[title];
  const [show, setShow] = useState(false);
  const closeBtn = useRef(null);

  const close = useCallback(() => {
    setShow(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    closeBtn.current?.focus();

    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [close]);

  if (!data) return null;
  const Icon = data.icon;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center p-0 transition-opacity duration-200 sm:items-center sm:p-6 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      dir="rtl"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" onClick={close} />

      {/* Panel */}
      <div
        className={`relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all duration-300 ease-out sm:max-w-xl sm:rounded-3xl ${
          show ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-4 bg-gradient-to-br from-emerald-500 to-emerald-700 px-5 py-5 text-white sm:px-7">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-bold">{data.title}</h2>
            <p className="text-sm text-emerald-50/90">{data.subtitle}</p>
          </div>
          <button
            ref={closeBtn}
            onClick={close}
            aria-label="إغلاق"
            className="rounded-full p-2 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 overflow-y-auto px-5 py-6 sm:px-7">
          {data.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-7">
          <p className="text-xs text-gray-500">
            عندك سؤال؟ اتصل بينا على <span dir="ltr">01092997107</span>
          </p>
          <button
            onClick={close}
            className="rounded-xl bg-gray-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            تمام
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ------------------------------------------------------------------ */
/*  قائمة لينكس                                                        */
/* ------------------------------------------------------------------ */
const LinkList = ({ items, onOpen }) => (
  <ul className="flex flex-col gap-3 text-gray-600">
    {items.map((item) => (
      <li key={item}>
        <button
          type="button"
          onClick={() => onOpen(item)}
          className="flex items-center gap-2 text-left transition-all duration-300 hover:translate-x-2 hover:text-emerald-600 focus:outline-none focus-visible:text-emerald-600"
        >
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          {item}
        </button>
      </li>
    ))}
  </ul>
);

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
const Footer = () => {
  const [visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Home = يرجّعك لأول الصفحة، والباقي يفتح البورتال
  const handleOpen = (item) => {
    if (item === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setActiveLink(item);
  };

  return (
    <>
      <footer
        className={`bg-gradient-to-b from-white to-gray-50 shadow-2xl shadow-gray-200/50 rounded-t-3xl pt-12 md:pt-16 pb-6 px-4 sm:px-6 md:px-12 lg:px-20 mt-20 md:mt-32 transition-all duration-1000 ease-out transform ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 text-sm">
          {/* Logo + Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Shams Store
              </h1>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              Shams Store brings you the latest trends with timeless elegance.
              Discover your style and express yourself with confidence.
            </p>

            <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl border border-amber-200/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-lg shadow-md">
                  <Code className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-amber-700 font-medium">Developed by</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">Mahmoud_Elsheshtawy</span>
                    <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-700 rounded-full text-[10px] font-semibold">
                      Full Stack
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 relative inline-block">
              COMPANY
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
            </h3>
            <LinkList items={["Home", "About Us", "Delivery", "Privacy Policy"]} onOpen={handleOpen} />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 relative inline-block">
              QUICK LINKS
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
            </h3>
            <LinkList
              items={["FAQ", "Terms & Conditions", "Return Policy", "Size Guide"]}
              onOpen={handleOpen}
            />
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 relative inline-block">
              GET IN TOUCH
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></span>
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Store Phone</p>
                  <a className="text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors">
                    01092997107
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Store Address</p>
                  <p className="text-sm font-medium text-gray-900">Cairo, Egypt</p>
                </div>
              </div>
            </div>

            <div className="hidden sm:block pt-2">
              <p className="text-sm font-semibold text-gray-800 mb-2">Newsletter</p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all text-sm bg-white"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <button className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-b from-white to-gray-50 text-xs text-gray-400">
              <Heart className="w-4 h-4 text-emerald-500 inline-block mx-1" />
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-3 order-1 sm:order-2">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-gray-600 text-xs sm:text-sm">Developed by</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-800 text-sm sm:text-base">Mahmoud_Elsheshtawy</span>
              <a
                href="https://wa.me/01093482958"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 text-xs font-medium shadow-md hover:shadow-lg"
              >
                <Send className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Developer Contact */}
        <div className="sm:hidden mt-6 space-y-4">
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Smartphone className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">تواصل مع المطور</p>
                <a
                  href="https://wa.me/01093482958"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-medium w-full justify-center"
                >
                  <Send className="w-4 h-4" />
                  <span>واتساب: 01093482958</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Portal */}
      {activeLink && <InfoPortal title={activeLink} onClose={() => setActiveLink(null)} />}
    </>
  );
};

export default Footer;