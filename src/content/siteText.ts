export const siteText = {
    pl: {
        header: {
            menu: "Menu",
            close: "Zamknij",
            login: "Logowanie",
            register: "Rejestracja",
            account: "Moje konto",
            logout: "Wyloguj się",
            language: "Język",
            theme: "Motyw",
            switchToLight: "Przełącz na jasny motyw",
            switchToDark: "Przełącz na ciemny motyw",
        },

        account: {
            title: "Moje konto",

            expand: "Rozwiń",
            collapse: "Zwiń",

            accountDetailsTitle: "Dane konta",
            accountDetailsDescription: "Podstawowe informacje o Twoim koncie.",
            email: "E-mail",
            role: "Rola",
            logout: "Wyloguj się",
            loading: "Ładowanie...",
            failed: "Nie udało się załadować konta.",
            customer: "Klient",
            admin: "Administrator",

            ordersTitle: "Moje zamówienia",
            ordersDescription: "Historia Twoich zamówień w sklepie.",

            securityTitle: "Bezpieczeństwo konta",
            securityDescription: "Zmień hasło lub adres e-mail przypisany do konta.",

            passwordTitle: "Zmień hasło",
            newPassword: "Nowe hasło",
            confirmNewPassword: "Powtórz nowe hasło",
            passwordHint:
                "Hasło musi mieć minimum 8 znaków, co najmniej jedną literę i jedną cyfrę.",
            passwordSubmit: "Zmień hasło",
            passwordSubmitting: "Zapisywanie...",
            passwordSuccess: "Hasło zostało zmienione.",
            passwordFailed: "Nie udało się zmienić hasła.",

            emailTitle: "Zmień e-mail",
            newEmail: "Nowy adres e-mail",
            emailSubmit: "Zmień e-mail",
            emailSubmitting: "Wysyłanie...",
            emailSuccess:
                "Wysłaliśmy wiadomości potwierdzające na obecny i nowy adres e-mail. Aby zakończyć zmianę adresu, otwórz wiadomość na nowym adresie e-mail i potwierdź zmianę.",
            emailFailed: "Nie udało się zmienić adresu e-mail.",
            emailRateLimit:
                "Wysłano zbyt wiele wiadomości e-mail. Spróbuj ponownie później.",

            checkoutTitle: "Dane dostawy",
            checkoutDescription:
                "Te dane zostaną automatycznie użyte przy kolejnym zamówieniu.",
            firstName: "Imię",
            lastName: "Nazwisko",
            phone: "Telefon",
            country: "Kraj",
            city: "Miasto",
            postalCode: "Kod pocztowy",
            addressLine1: "Adres",
            addressLine2: "Adres cd. / mieszkanie",
            checkoutSubmit: "Zapisz dane dostawy",
            checkoutSubmitting: "Zapisywanie...",
            checkoutSuccess: "Dane dostawy zostały zapisane.",
            checkoutFailed: "Nie udało się zapisać danych dostawy.",

            invalidEmail: "Wpisz poprawny adres e-mail.",
            sameEmail: "Nowy adres e-mail jest taki sam jak obecny.",
            requiredFields: "Uzupełnij wszystkie wymagane pola.",
            shortPassword: "Hasło musi mieć co najmniej 8 znaków.",
            passwordNeedsLetter: "Hasło musi zawierać co najmniej jedną literę.",
            passwordNeedsNumber: "Hasło musi zawierać co najmniej jedną cyfrę.",
            passwordsDoNotMatch: "Hasła nie są takie same.",
        },

        orders: {
            title: "Moje zamówienia",
            empty: "Nie masz jeszcze żadnych zamówień.",
            orderNumber: "Zamówienie",
            status: "Status",
            total: "Razem",
            createdAt: "Data",
            viewOrder: "Zobacz zamówienie",
            items: "Produkty",
            quantity: "Ilość",
            price: "Cena",
        },

        orderSuccess: {
            title: "Dziękujemy za zamówienie!",
            orderNumber: "Numer zamówienia",
            description:
                "Twoje zamówienie zostało zapisane. Wkrótce otrzymasz dalsze informacje.",
            backToShop: "Wróć do sklepu",
        },

        checkout: {
            loadingProfile: "Ładowanie danych dostawy...",
            profileLoadFailed: "Nie udało się załadować zapisanych danych.",
            profileSaveFailed: "Nie udało się zapisać danych dostawy.",
            requiredFields: "Uzupełnij wszystkie wymagane pola.",
            orderCreationFailed: "Nie udało się utworzyć zamówienia.",
            placeOrderSubmitting: "Składanie zamówienia...",

            goToCheckout: "Przejdź do kasy",
            title: "Zamówienie",

            firstName: "Imię",
            lastName: "Nazwisko",
            email: "Email",
            phone: "Telefon",

            country: "Kraj",
            city: "Miasto",
            postalCode: "Kod pocztowy",
            addressLine1: "Adres",
            addressLine2: "Mieszkanie / lokal (opcjonalnie)",

            deliveryMethod: "Sposób dostawy",
            courier: "Kurier",
            parcelLocker: "Paczkomat",

            paymentMethod: "Sposób płatności",
            bankTransfer: "Przelew bankowy",
            cashOnDelivery: "Płatność przy odbiorze",

            placeOrder: "Złóż zamówienie",
            submitted: "Formularz zamówienia został wysłany.",
        },

        auth: {
            loginRequired: "Musisz się zalogować, aby zobaczyć profil.",

            loginTitle: "Logowanie",
            registerTitle: "Rejestracja",

            email: "Email",
            password: "Hasło",
            newPassword: "Nowe hasło",
            confirmPassword: "Powtórz hasło",

            loginButton: "Zaloguj się",
            loginLoading: "Logowanie...",

            registerButton: "Utwórz konto",
            registerLoading: "Tworzenie konta...",

            noAccount: "Nie masz konta?",
            haveAccount: "Masz już konto?",

            registerLink: "Zarejestruj się",
            loginLink: "Zaloguj się",

            googleLogin: "Kontynuuj z Google",
            googleAuthFailed: "Logowanie przez Google nie powiodło się.",

            loginEmailConfirmed:
                "Adres e-mail został potwierdzony. Możesz się teraz zalogować.",
            loginPasswordReset:
                "Hasło zostało zmienione. Możesz się teraz zalogować.",
            loginEmailNotConfirmed:
                "Najpierw potwierdź swój adres e-mail. Sprawdź skrzynkę pocztową.",
            forgotPasswordLink: "Nie pamiętasz hasła?",

            registerSuccess:
                "Konto zostało utworzone. Sprawdź e-mail i potwierdź adres.",

            forgotPasswordTitle: "Przywracanie hasła",
            forgotPasswordDescription:
                "Wpisz adres e-mail, a wyślemy link do ustawienia nowego hasła.",
            forgotPasswordSuccess:
                "Jeśli konto istnieje, link do zmiany hasła został wysłany na e-mail.",
            forgotPasswordSubmit: "Wyślij link",
            forgotPasswordSubmitting: "Wysyłanie...",
            forgotPasswordBackToLogin: "Wróć do logowania",

            resetPasswordTitle: "Ustaw nowe hasło",
            resetPasswordDescription: "Wpisz nowe hasło do swojego konta.",
            resetPasswordSuccess:
                "Hasło zostało zmienione. Możesz się teraz zalogować.",
            resetPasswordFailed: "Nie udało się zmienić hasła.",
            resetPasswordInvalidSession:
                "Link do zmiany hasła jest nieaktywny albo wygasł. Spróbuj wysłać go ponownie.",
            resetPasswordSubmit: "Zmień hasło",
            resetPasswordSubmitting: "Zapisywanie...",
            requestNewResetLink: "Wyślij nowy link",

            passwordHint:
                "Hasło musi mieć minimum 8 znaków, co najmniej jedną literę i jedną cyfrę.",
            invalidEmail: "Wpisz poprawny adres e-mail.",
            shortPassword: "Hasło musi mieć co najmniej 8 znaków.",
            passwordNeedsLetter: "Hasło musi zawierać co najmniej jedną literę.",
            passwordNeedsNumber: "Hasło musi zawierać co najmniej jedną cyfrę.",
            passwordsDoNotMatch: "Hasła nie są takie same.",
            emailRateLimit:
                "Wysłano zbyt wiele wiadomości e-mail. Spróbuj ponownie za godzinę.",

            logout: "Wyloguj",
            profile: "Profil",
        },

        cart: {
            nav: "Koszyk",
            title: "Koszyk",
            empty: "Koszyk jest pusty",
            remove: "Usuń",
            summary: "Podsumowanie",
            items: "Produkty",
            total: "Razem",
            clear: "Wyczyść koszyk",
        },

        favorites: {
            title: "Ulubione produkty",
            empty: "Nie masz jeszcze ulubionych produktów.",
            nav: "Ulubione",
        },

        categories: {
            all: "Wszystkie",
            bags: "Torby",
            notepads: "Notesy",
            kitchen: "Kuchnia",
        },

        search: {
            placeholder: "Szukaj produktów...",
            title: "Wyniki wyszukiwania",
            query: "Zapytanie",
            enterQuery: "Wpisz frazę, aby znaleźć produkty.",
            empty: "Nie znaleziono produktów.",
        },

        demoBanner: {
            text: "🛍️ Sklep jest obecnie w fazie przygotowań do uruchomienia. To wersja demonstracyjna.",
        },

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
            inStock: "Dostępny",
            outOfStock: "Brak w magazynie",
            stockCount: "Dostępne sztuki",
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
        header: {
            menu: "Меню",
            close: "Закрити",
            login: "Вхід",
            register: "Реєстрація",
            account: "Мій акаунт",
            logout: "Вийти",
            language: "Мова",
            theme: "Тема",
            switchToLight: "Перемкнути на світлу тему",
            switchToDark: "Перемкнути на темну тему",
        },

        account: {
            title: "Мій акаунт",

            expand: "Розгорнути",
            collapse: "Згорнути",

            accountDetailsTitle: "Дані акаунту",
            accountDetailsDescription: "Основна інформація про твій акаунт.",
            email: "Електронна пошта",
            role: "Роль",
            logout: "Вийти",
            loading: "Завантаження...",
            failed: "Не вдалося завантажити акаунт.",
            customer: "Клієнт",
            admin: "Адміністратор",

            ordersTitle: "Мої замовлення",
            ordersDescription: "Історія твоїх замовлень у магазині.",

            securityTitle: "Безпека акаунту",
            securityDescription: "Зміни пароль або email, привʼязаний до акаунту.",

            passwordTitle: "Змінити пароль",
            newPassword: "Новий пароль",
            confirmNewPassword: "Повтори новий пароль",
            passwordHint:
                "Пароль має містити мінімум 8 символів, щонайменше одну літеру й одну цифру.",
            passwordSubmit: "Змінити пароль",
            passwordSubmitting: "Збереження...",
            passwordSuccess: "Пароль змінено.",
            passwordFailed: "Не вдалося змінити пароль.",

            emailTitle: "Змінити email",
            newEmail: "Новий email",
            emailSubmit: "Змінити email",
            emailSubmitting: "Надсилання...",
            emailSuccess:
                "Ми надіслали листи підтвердження на поточну та нову email-адресу. Щоб завершити зміну email, відкрий лист на новій пошті та підтвердь нову адресу.",
            emailFailed: "Не вдалося змінити email.",
            emailRateLimit:
                "Надіслано забагато email-листів. Спробуй ще раз пізніше.",

            checkoutTitle: "Дані доставки",
            checkoutDescription:
                "Ці дані автоматично підставляться при наступному замовленні.",
            firstName: "Імʼя",
            lastName: "Прізвище",
            phone: "Телефон",
            country: "Країна",
            city: "Місто",
            postalCode: "Поштовий індекс",
            addressLine1: "Адреса",
            addressLine2: "Адреса додатково / квартира",
            checkoutSubmit: "Зберегти дані доставки",
            checkoutSubmitting: "Збереження...",
            checkoutSuccess: "Дані доставки збережено.",
            checkoutFailed: "Не вдалося зберегти дані доставки.",

            invalidEmail: "Введи коректний email.",
            sameEmail: "Новий email збігається з поточним.",
            requiredFields: "Заповни всі обовʼязкові поля.",
            shortPassword: "Пароль має містити щонайменше 8 символів.",
            passwordNeedsLetter: "Пароль має містити щонайменше одну літеру.",
            passwordNeedsNumber: "Пароль має містити щонайменше одну цифру.",
            passwordsDoNotMatch: "Паролі не збігаються.",
        },

        orders: {
            title: "Мої замовлення",
            empty: "У вас ще немає замовлень.",
            orderNumber: "Замовлення",
            status: "Статус",
            total: "Разом",
            createdAt: "Дата",
            viewOrder: "Переглянути замовлення",
            items: "Товари",
            quantity: "Кількість",
            price: "Ціна",
        },

        orderSuccess: {
            title: "Дякуємо за замовлення!",
            orderNumber: "Номер замовлення",
            description:
                "Ваше замовлення збережено. Найближчим часом ви отримаєте подальшу інформацію.",
            backToShop: "Повернутися до магазину",
        },

        checkout: {
            loadingProfile: "Завантаження даних доставки...",
            profileLoadFailed: "Не вдалося завантажити збережені дані.",
            profileSaveFailed: "Не вдалося зберегти дані доставки.",
            requiredFields: "Заповни всі обовʼязкові поля.",
            orderCreationFailed: "Не вдалося створити замовлення.",
            placeOrderSubmitting: "Оформлення замовлення...",

            goToCheckout: "Перейти до оформлення",
            title: "Оформлення замовлення",

            firstName: "Імʼя",
            lastName: "Прізвище",
            email: "Email",
            phone: "Телефон",

            country: "Країна",
            city: "Місто",
            postalCode: "Поштовий індекс",
            addressLine1: "Адреса",
            addressLine2: "Квартира / приміщення (необовʼязково)",

            deliveryMethod: "Спосіб доставки",
            courier: "Курʼєр",
            parcelLocker: "Поштомат",

            paymentMethod: "Спосіб оплати",
            bankTransfer: "Банківський переказ",
            cashOnDelivery: "Оплата при отриманні",

            placeOrder: "Оформити замовлення",
            submitted: "Форму замовлення надіслано.",
        },

        auth: {
            loginRequired: "Потрібно увійти, щоб переглянути профіль.",

            loginTitle: "Вхід",
            registerTitle: "Реєстрація",

            email: "Email",
            password: "Пароль",
            newPassword: "Новий пароль",
            confirmPassword: "Повтори пароль",

            loginButton: "Увійти",
            loginLoading: "Вхід...",

            registerButton: "Створити акаунт",
            registerLoading: "Створення акаунта...",

            noAccount: "Ще немає акаунта?",
            haveAccount: "Вже маєте акаунт?",

            registerLink: "Зареєструватися",
            loginLink: "Увійти",

            googleLogin: "Продовжити з Google",
            googleAuthFailed: "Не вдалося увійти через Google.",

            loginEmailConfirmed:
                "Електронну пошту підтверджено. Тепер можна увійти.",
            loginPasswordReset: "Пароль змінено. Тепер можна увійти.",
            loginEmailNotConfirmed:
                "Спочатку підтверди електронну пошту. Перевір свою поштову скриньку.",
            forgotPasswordLink: "Не памʼятаєш пароль?",

            registerSuccess:
                "Акаунт створено. Перевір пошту й підтверди електронну адресу.",

            forgotPasswordTitle: "Відновлення паролю",
            forgotPasswordDescription:
                "Введи електронну пошту, і ми надішлемо посилання для створення нового паролю.",
            forgotPasswordSuccess:
                "Якщо акаунт існує, посилання для зміни паролю надіслано на пошту.",
            forgotPasswordSubmit: "Надіслати посилання",
            forgotPasswordSubmitting: "Надсилання...",
            forgotPasswordBackToLogin: "Повернутись до входу",

            resetPasswordTitle: "Створи новий пароль",
            resetPasswordDescription: "Введи новий пароль для свого акаунту.",
            resetPasswordSuccess: "Пароль змінено. Тепер можна увійти.",
            resetPasswordFailed: "Не вдалося змінити пароль.",
            resetPasswordInvalidSession:
                "Посилання для зміни паролю неактивне або протерміноване. Спробуй надіслати його ще раз.",
            resetPasswordSubmit: "Змінити пароль",
            resetPasswordSubmitting: "Збереження...",
            requestNewResetLink: "Надіслати нове посилання",

            passwordHint:
                "Пароль має містити мінімум 8 символів, щонайменше одну літеру й одну цифру.",
            invalidEmail: "Введи коректну електронну пошту.",
            shortPassword: "Пароль має містити щонайменше 8 символів.",
            passwordNeedsLetter: "Пароль має містити щонайменше одну літеру.",
            passwordNeedsNumber: "Пароль має містити щонайменше одну цифру.",
            passwordsDoNotMatch: "Паролі не збігаються.",
            emailRateLimit:
                "Надіслано забагато email-листів. Спробуй ще раз приблизно за годину.",

            logout: "Вийти",
            profile: "Профіль",
        },

        cart: {
            nav: "Кошик",
            title: "Кошик",
            empty: "Кошик порожній",
            remove: "Видалити",
            summary: "Підсумок",
            items: "Товари",
            total: "Разом",
            clear: "Очистити кошик",
        },

        favorites: {
            title: "Улюблені товари",
            empty: "У тебе ще немає улюблених товарів.",
            nav: "Улюблені",
        },

        categories: {
            all: "Всі",
            bags: "Сумки",
            notepads: "Блокноти",
            kitchen: "Кухня",
        },

        search: {
            placeholder: "Пошук товарів...",
            title: "Результати пошуку",
            query: "Запит",
            enterQuery: "Введіть запит, щоб знайти товари.",
            empty: "Товарів не знайдено.",
        },

        demoBanner: {
            text: "🛍️ Магазин перебуває на етапі підготовки до запуску. Це демонстраційна версія.",
        },

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
            inStock: "Є в наявності",
            outOfStock: "Немає в наявності",
            stockCount: "Доступно",
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