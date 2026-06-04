import Link from "next/link";
import Header from "@/components/Header";

export default function SupportPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-white">
        <section className="max-w-3xl mx-auto px-6 py-20">
          <Link href="/" className="text-sm text-gray-500 hover:text-black">
            ← Повернутися до магазину
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gray-400 mb-4">
            Запуск магазину
          </p>

          <h1 className="text-4xl font-bold text-gray-900">
            SZUFLADA зараз існує як демо-версія
          </h1>

          <p className="mt-6 text-gray-600">
            Я створюю цей сайт, щоб перевірити ідею невеликого
            інтернет-магазину з практичними товарами для дому перед першою
            закупівлею.
          </p>

          <div className="mt-10 space-y-4">
            <p>✓ Створення сайту</p>
            <p>✓ Вибір перших товарів</p>
            <p>✓ Демо-каталог</p>
            <p>⏳ Перша закупівля товарів</p>
            <p>⏳ Запуск повноцінного магазину</p>
          </div>

          <div className="mt-10 rounded-3xl bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900">
              На що піде підтримка?
            </h2>

            <ul className="mt-4 space-y-2 text-gray-600">
              <li>Закупівля першої партії товарів</li>
              <li>Міжнародна доставка</li>
              <li>Пакування замовлень</li>
              <li>Тестування реклами та просування</li>
            </ul>
          </div>

          <a
            href="https://4fund.com/449vkn"
            className="mt-8 inline-flex rounded-full bg-black text-white px-6 py-3"
          >
            Підтримати через 4fund
          </a>
        </section>
      </main>
    </>
  );
}