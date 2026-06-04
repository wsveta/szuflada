import Image from "next/image";

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
            <a
              href="#catalog"
              className="px-6 py-3 bg-black text-white rounded-full"
            >
              Переглянути каталог
            </a>

            <a
              href="#about"
              className="px-6 py-3 border border-gray-300 rounded-full"
            >
              Про проєкт
            </a>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
          <Image
            src="/hero/hero-image.jpeg"
            alt="Szuflada hero image"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}