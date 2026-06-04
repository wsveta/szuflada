export const siteText = {
    pl: {
        nav: {
            catalog: "Katalog",
            about: "O projekcie",
            launch: "Start sklepu",
        },
        hero: {
            label: "SZUFLADA",
            title: "Praktyczne drobiazgi\ndo domu",
            description:
                "Wybór przydatnych produktów do kuchni, łazienki i organizacji przestrzeni.",
            catalogButton: "Zobacz katalog",
            aboutButton: "O projekcie",
        },
        catalog: {
            label: "Katalog",
            title: "Popularne produkty",
            viewAll: "Zobacz wszystkie →",
        },
        product: {
            addToCart: "Dodaj do koszyka",
            backToShop: "← Powrót do sklepu",
            notFound: "Produkt nie został znaleziony",
        },
        modal: {
            title: "Dziękujemy za zainteresowanie!",
            text1:
                "To jest obecnie demonstracyjna wersja sklepu. Tworzę ją, aby sprawdzić pomysł i przygotować start prawdziwego sklepu internetowego.",
            text2:
                "Jeśli podobają Ci się produkty, możesz wesprzeć powstanie sklepu.",
            support: "Wesprzyj start",
            back: "Wróć do katalogu",
        },
        about: {
            label: "O projekcie",
            title: "To demonstracyjna wersja przyszłego sklepu",
            description:
                "Szuflada powstaje jako mały sklep internetowy z praktycznymi produktami do domu. Obecnie strona pomaga sprawdzić zainteresowanie pomysłem przed pierwszym zakupem towarów.",
        },
        support: {
            back: "← Powrót do sklepu",
            label: "Start sklepu",
            title: "SZUFLADA istnieje teraz jako wersja demo",
            description:
                "Tworzę tę stronę, aby sprawdzić pomysł małego sklepu internetowego z praktycznymi produktami do domu przed pierwszym zakupem towarów.",
            steps: [
                "✓ Stworzenie strony",
                "✓ Wybór pierwszych produktów",
                "✓ Katalog demo",
                "⏳ Pierwszy zakup towarów",
                "⏳ Start pełnego sklepu",
            ],
            fundsTitle: "Na co zostanie przeznaczone wsparcie?",
            funds: [
                "Zakup pierwszej partii produktów",
                "Dostawa międzynarodowa",
                "Pakowanie zamówień",
                "Testowanie reklamy i promocji",
            ],
            button: "Wesprzyj przez 4fund",
        },
        footer: {
            tagline: "Praktyczne drobiazgi do domu",
        },
    },

    uk: {
        nav: {
            catalog: "Каталог",
            about: "Про проєкт",
            launch: "Запуск магазину",
        },
        hero: {
            label: "SZUFLADA",
            title: "Практичні дрібниці\nдля дому",
            description:
                "Добірка корисних товарів для кухні, ванної кімнати та організації простору.",
            catalogButton: "Переглянути каталог",
            aboutButton: "Про проєкт",
        },
        catalog: {
            label: "Каталог",
            title: "Популярні товари",
            viewAll: "Переглянути всі →",
        },
        product: {
            addToCart: "Додати в кошик",
            backToShop: "← Назад до магазину",
            notFound: "Товар не знайдено",
        },
        modal: {
            title: "Дякуємо за інтерес!",
            text1:
                "Зараз це демонстраційна версія магазину. Я створюю її, щоб перевірити ідею та підготувати запуск справжнього інтернет-магазину.",
            text2:
                "Якщо вам сподобалися товари, ви можете підтримати створення магазину.",
            support: "Підтримати запуск",
            back: "Повернутися до каталогу",
        },
        about: {
            label: "Про проєкт",
            title: "Це демо-версія майбутнього магазину",
            description:
                "Szuflada створюється як невеликий інтернет-магазин з практичними товарами для дому. Зараз сайт допомагає перевірити інтерес до ідеї перед запуском першої партії товарів.",
        },
        support: {
            back: "← Повернутися до магазину",
            label: "Запуск магазину",
            title: "SZUFLADA зараз існує як демо-версія",
            description:
                "Я створюю цей сайт, щоб перевірити ідею невеликого інтернет-магазину з практичними товарами для дому перед першою закупівлею.",
            steps: [
                "✓ Створення сайту",
                "✓ Вибір перших товарів",
                "✓ Демо-каталог",
                "⏳ Перша закупівля товарів",
                "⏳ Запуск повноцінного магазину",
            ],
            fundsTitle: "На що піде підтримка?",
            funds: [
                "Закупівля першої партії товарів",
                "Міжнародна доставка",
                "Пакування замовлень",
                "Тестування реклами та просування",
            ],
            button: "Підтримати через 4fund",
        },
        footer: {
            tagline: "Практичні дрібниці для дому",
        },
    },
};

export type Language = keyof typeof siteText;