export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
            SZUFLADA
          </p>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Практичні дрібниці
            <br />
            для дому
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Добірка корисних товарів для кухні, ванної кімнати та організації
            простору.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-black text-white rounded-full">
              Переглянути каталог
            </button>

            <button className="px-6 py-3 border border-gray-300 text-black rounded-full">
              Про проєкт
            </button>
          </div>
        </div>

        <div className="aspect-[4/5] rounded-3xl bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Тут буде фото товарів</span>
section        </div>
      </div>
    </section>
  );
}