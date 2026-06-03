type SupportModalProps = {
  onClose: () => void;
};

export default function SupportModal({ onClose }: SupportModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Дякуємо за інтерес!
        </h2>

        <p className="mt-4 text-gray-600">
          Зараз це демонстраційна версія магазину. Я створюю її, щоб
          перевірити ідею та підготувати запуск справжнього інтернет-магазину.
        </p>

        <p className="mt-4 text-gray-600">
          Якщо вам сподобалися товари, ви можете підтримати створення магазину.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href="#"
            className="text-center rounded-full bg-black text-white py-3"
          >
            Підтримати запуск
          </a>

          <button
  onClick={onClose}
  className="rounded-full border border-gray-300 py-3 text-black hover:bg-gray-50"
>
  Повернутися до каталогу
</button>
        </div>
      </div>
    </div>
  );
}