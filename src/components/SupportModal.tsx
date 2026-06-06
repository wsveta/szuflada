import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

type SupportModalProps = {
  onClose: () => void;
};

export default function SupportModal({ onClose }: SupportModalProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {t.modal.title}
        </h2>

        <p className="mt-4 text-gray-600">{t.modal.text1}</p>

        <p className="mt-4 text-gray-600">{t.modal.text2}</p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/support"
            className="text-center rounded-full bg-black text-white py-3 transition-all duration-200
          hover:bg-zinc-800
          hover:-translate-y-0.5"
          >
            {t.modal.support}
          </Link>

          <button
            onClick={onClose}
            className="rounded-full border border-gray-300 py-3 text-black hover:bg-gray-50 transition-all duration-200
          hover:-translate-y-0.5"
          >
            {t.modal.back}
          </button>
        </div>
      </div>
    </div>
  );
}
