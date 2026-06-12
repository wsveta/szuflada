export type ProductForSupabase = {
    sku: string;
    slug: string;
    name_pl: string;
    name_uk: string;
    description_pl: string;
    description_uk: string;
    price: number;
    image_url: string;
    image_urls: string[];
    category: string;
    stock: number;
    is_available: boolean;
};

export const productsForSupabase: ProductForSupabase[] = [
    {
        "sku": "SZU-LIVI-001",
        "slug": "podkladka-pod-kubek-z-korka",
        "name_pl": "Podkładka pod kubek z korka",
        "name_uk": "Коркова підставка під чашку",
        "description_pl": "Mała podkładka chroniąca blat stolika przed śladami po kubku.",
        "description_uk": "Маленька підставка, що захищає поверхню столика від слідів чашки.",
        "price": 8.99,
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 15,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-002",
        "slug": "organizer-na-piloty",
        "name_pl": "Organizer na piloty",
        "name_uk": "Органайзер для пультів",
        "description_pl": "Praktyczny organizer na piloty, ładowarki i drobne akcesoria salonowe.",
        "description_uk": "Практичний органайзер для пультів, зарядок і дрібних аксесуарів у вітальні.",
        "price": 24.99,
        "image_url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 22,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-003",
        "slug": "koszyk-na-pledy",
        "name_pl": "Koszyk na pledy",
        "name_uk": "Кошик для пледів",
        "description_pl": "Miękki koszyk do przechowywania koców, poduszek i tekstyliów.",
        "description_uk": "Мʼякий кошик для зберігання пледів, подушок і текстилю.",
        "price": 39.99,
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 29,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-004",
        "slug": "taca-dekoracyjna-na-stolik",
        "name_pl": "Taca dekoracyjna na stolik",
        "name_uk": "Декоративний піднос на столик",
        "description_pl": "Minimalistyczna taca na świecę, kubek lub drobne dekoracje.",
        "description_uk": "Мінімалістичний піднос для свічки, чашки або дрібного декору.",
        "price": 29.99,
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 36,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-005",
        "slug": "klipsy-do-kabli-przy-tv",
        "name_pl": "Klipsy do kabli przy TV",
        "name_uk": "Кліпси для кабелів біля телевізора",
        "description_pl": "Zestaw klipsów do uporządkowania kabli za szafką RTV.",
        "description_uk": "Набір кліпсів для впорядкування кабелів за тумбою ТВ.",
        "price": 11.99,
        "image_url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 43,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-006",
        "slug": "maly-pojemnik-na-drobiazgi",
        "name_pl": "Mały pojemnik na drobiazgi",
        "name_uk": "Малий контейнер для дрібниць",
        "description_pl": "Pojemnik na baterie, zapalniczki i małe rzeczy, które znikają w salonie.",
        "description_uk": "Контейнер для батарейок, запальничок і дрібниць, які губляться у вітальні.",
        "price": 16.99,
        "image_url": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 50,
        "is_available": true
    },
    {
        "sku": "SZU-LIVI-007",
        "slug": "filcowe-podkladki-pod-meble",
        "name_pl": "Filcowe podkładki pod meble",
        "name_uk": "Фетрові накладки під меблі",
        "description_pl": "Samoprzylepne podkładki chroniące podłogę przed zarysowaniami.",
        "description_uk": "Самоклейні накладки, що захищають підлогу від подряпин.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "living-room",
        "stock": 57,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-008",
        "slug": "magnetyczny-notes-na-lodowke",
        "name_pl": "Magnetyczny notes na lodówkę",
        "name_uk": "Магнітний блокнот на холодильник",
        "description_pl": "Notes magnetyczny do list zakupów, planów posiłków i domowych przypomnień.",
        "description_uk": "Магнітний блокнот для списків покупок, планів страв і домашніх нагадувань.",
        "price": 24.99,
        "image_url": "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "notes",
        "stock": 64,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-009",
        "slug": "planer-tygodniowy-a5",
        "name_pl": "Planer tygodniowy A5",
        "name_uk": "Тижневий планер A5",
        "description_pl": "Kompaktowy planer do pracy, nauki i codziennych zadań.",
        "description_uk": "Компактний планер для роботи, навчання і щоденних справ.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "notes",
        "stock": 14,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-010",
        "slug": "lista-zakupow-z-odrywanymi-kartkami",
        "name_pl": "Lista zakupów z odrywanymi kartkami",
        "name_uk": "Список покупок із відривними аркушами",
        "description_pl": "Prosty notes do szybkiego zapisywania brakujących produktów.",
        "description_uk": "Простий блокнот для швидкого запису продуктів, яких бракує.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "notes",
        "stock": 21,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-011",
        "slug": "notatnik-kuchenny",
        "name_pl": "Notatnik kuchenny",
        "name_uk": "Кухонний нотатник",
        "description_pl": "Notes na przepisy, pomysły obiadowe i listy zakupów.",
        "description_uk": "Нотатник для рецептів, ідей для обіду і списків покупок.",
        "price": 14.99,
        "image_url": "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "notes",
        "stock": 28,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-012",
        "slug": "karteczki-samoprzylepne-pastelowe",
        "name_pl": "Karteczki samoprzylepne pastelowe",
        "name_uk": "Пастельні самоклейні стікери",
        "description_pl": "Zestaw karteczek do oznaczania zadań, terminów i krótkich notatek.",
        "description_uk": "Набір стікерів для позначення справ, дат і коротких нотаток.",
        "price": 7.99,
        "image_url": "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "notes",
        "stock": 35,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-013",
        "slug": "mini-notes-do-torebki",
        "name_pl": "Mini notes do torebki",
        "name_uk": "Міні-блокнот у сумку",
        "description_pl": "Mały notes, który łatwo zmieścić w torebce lub kieszeni.",
        "description_uk": "Малий блокнот, який легко помістити в сумку або кишеню.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "notes",
        "stock": 42,
        "is_available": true
    },
    {
        "sku": "SZU-NOTE-014",
        "slug": "planer-domowego-budzetu",
        "name_pl": "Planer domowego budżetu",
        "name_uk": "Планер домашнього бюджету",
        "description_pl": "Notes do prostego planowania wydatków i zakupów domowych.",
        "description_uk": "Блокнот для простого планування витрат і домашніх покупок.",
        "price": 21.99,
        "image_url": "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3866999/pexels-photo-3866999.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "notes",
        "stock": 49,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-015",
        "slug": "torba-materialowa-na-zakupy",
        "name_pl": "Torba materiałowa na zakupy",
        "name_uk": "Тканинна сумка для покупок",
        "description_pl": "Lekka torba wielokrotnego użytku na codzienne zakupy.",
        "description_uk": "Легка багаторазова сумка для щоденних покупок.",
        "price": 19.99,
        "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 56,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-016",
        "slug": "siatkowa-torba-na-warzywa",
        "name_pl": "Siatkowa torba na warzywa",
        "name_uk": "Сітчаста сумка для овочів",
        "description_pl": "Przewiewna torba na owoce, warzywa i produkty luzem.",
        "description_uk": "Дихаюча сумка для фруктів, овочів і товарів на вагу.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 63,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-017",
        "slug": "organizer-do-torebki",
        "name_pl": "Organizer do torebki",
        "name_uk": "Органайзер для сумки",
        "description_pl": "Wkład do torebki pomagający uporządkować klucze, kosmetyki i dokumenty.",
        "description_uk": "Вкладка в сумку для ключів, косметики і документів.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 13,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-018",
        "slug": "skladana-torba-zakupowa",
        "name_pl": "Składana torba zakupowa",
        "name_uk": "Складана сумка для покупок",
        "description_pl": "Kompaktowa torba, którą można nosić zawsze przy sobie.",
        "description_uk": "Компактна сумка, яку можна завжди мати з собою.",
        "price": 16.99,
        "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 20,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-019",
        "slug": "torba-termiczna-na-lunch",
        "name_pl": "Torba termiczna na lunch",
        "name_uk": "Термосумка для ланчу",
        "description_pl": "Praktyczna torba utrzymująca temperaturę jedzenia poza domem.",
        "description_uk": "Практична сумка, що зберігає температуру їжі поза домом.",
        "price": 34.99,
        "image_url": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 27,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-020",
        "slug": "woreczki-wielorazowe-3-szt",
        "name_pl": "Woreczki wielorazowe 3 szt.",
        "name_uk": "Багаторазові мішечки 3 шт.",
        "description_pl": "Zestaw woreczków do przechowywania i zakupów bez jednorazowych reklamówek.",
        "description_uk": "Набір мішечків для зберігання і покупок без одноразових пакетів.",
        "price": 17.99,
        "image_url": "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 34,
        "is_available": true
    },
    {
        "sku": "SZU-BAGS-021",
        "slug": "mala-torba-na-kosmetyki",
        "name_pl": "Mała torba na kosmetyki",
        "name_uk": "Маленька косметичка",
        "description_pl": "Poręczna kosmetyczka do torby, pracy lub podróży.",
        "description_uk": "Зручна косметичка для сумки, роботи або подорожі.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bags",
        "stock": 41,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-022",
        "slug": "czarne-gabki-do-naczyn-5-szt",
        "name_pl": "Czarne gąbki do naczyń 5 szt.",
        "name_uk": "Чорні губки для посуду 5 шт.",
        "description_pl": "Zestaw estetycznych gąbek do codziennego mycia naczyń.",
        "description_uk": "Набір естетичних губок для щоденного миття посуду.",
        "price": 8.99,
        "image_url": "https://images.pexels.com/photos/7492919/pexels-photo-7492919.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/7492919/pexels-photo-7492919.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 48,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-023",
        "slug": "uchwyt-na-gabke-do-zlewu",
        "name_pl": "Uchwyt na gąbkę do zlewu",
        "name_uk": "Тримач для губки біля мийки",
        "description_pl": "Mały uchwyt pomagający utrzymać porządek przy zlewie.",
        "description_uk": "Малий тримач, що допомагає підтримувати порядок біля мийки.",
        "price": 12.99,
        "image_url": "https://images.pexels.com/photos/4862167/pexels-photo-4862167.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4862167/pexels-photo-4862167.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 55,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-024",
        "slug": "dozownik-na-plyn-do-naczyn",
        "name_pl": "Dozownik na płyn do naczyń",
        "name_uk": "Дозатор для засобу для миття посуду",
        "description_pl": "Wygodny dozownik zastępujący oryginalne opakowanie płynu.",
        "description_uk": "Зручний дозатор замість заводської пляшки засобу.",
        "price": 21.99,
        "image_url": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "kitchen",
        "stock": 62,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-025",
        "slug": "deska-do-krojenia-z-uchwytem",
        "name_pl": "Deska do krojenia z uchwytem",
        "name_uk": "Дошка для нарізання з отвором",
        "description_pl": "Praktyczna deska do warzyw, owoców i codziennego gotowania.",
        "description_uk": "Практична дошка для овочів, фруктів і щоденного приготування.",
        "price": 34.99,
        "image_url": "https://images.pexels.com/photos/27858800/pexels-photo-27858800.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/27858800/pexels-photo-27858800.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 12,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-026",
        "slug": "separator-do-szuflady-kuchennej",
        "name_pl": "Separator do szuflady kuchennej",
        "name_uk": "Розділювач для кухонної шухляди",
        "description_pl": "Regulowany separator do sztućców i drobnych akcesoriów.",
        "description_uk": "Регульований розділювач для приборів і дрібних аксесуарів.",
        "price": 19.99,
        "image_url": "https://images.pexels.com/photos/7492919/pexels-photo-7492919.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/7492919/pexels-photo-7492919.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 19,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-027",
        "slug": "silikonowa-podkladka-pod-garnek",
        "name_pl": "Silikonowa podkładka pod garnek",
        "name_uk": "Силіконова підставка під каструлю",
        "description_pl": "Elastyczna podkładka chroniąca blat przed wysoką temperaturą.",
        "description_uk": "Гнучка підставка, що захищає стільницю від високої температури.",
        "price": 13.99,
        "image_url": "https://images.pexels.com/photos/4862167/pexels-photo-4862167.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4862167/pexels-photo-4862167.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 26,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-028",
        "slug": "klipsy-do-zamykania-opakowan",
        "name_pl": "Klipsy do zamykania opakowań",
        "name_uk": "Кліпси для закриття упаковок",
        "description_pl": "Zestaw klipsów do makaronu, płatków i otwartych produktów.",
        "description_uk": "Набір кліпсів для макаронів, пластівців та відкритих продуктів.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "kitchen",
        "stock": 33,
        "is_available": true
    },
    {
        "sku": "SZU-KITC-029",
        "slug": "szczotka-do-butelek",
        "name_pl": "Szczotka do butelek",
        "name_uk": "Щітка для пляшок",
        "description_pl": "Wąska szczotka do mycia butelek, termosów i dzbanków.",
        "description_uk": "Вузька щітка для миття пляшок, термосів і глечиків.",
        "price": 11.99,
        "image_url": "https://images.pexels.com/photos/27858800/pexels-photo-27858800.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/27858800/pexels-photo-27858800.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "kitchen",
        "stock": 40,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-030",
        "slug": "minimalistyczna-mydelniczka",
        "name_pl": "Minimalistyczna mydelniczka",
        "name_uk": "Мінімалістична мильниця",
        "description_pl": "Mydelniczka z odpływem pomagająca utrzymać umywalkę w czystości.",
        "description_uk": "Мильниця з дренажем, що допомагає тримати раковину чистою.",
        "price": 16.99,
        "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bathroom",
        "stock": 47,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-031",
        "slug": "dozownik-na-mydlo-do-lazienki",
        "name_pl": "Dozownik na mydło do łazienki",
        "name_uk": "Дозатор для мила у ванну",
        "description_pl": "Estetyczny dozownik do mydła w płynie lub balsamu.",
        "description_uk": "Естетичний дозатор для рідкого мила або лосьйону.",
        "price": 19.99,
        "image_url": "https://images.pexels.com/photos/4862163/pexels-photo-4862163.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4862163/pexels-photo-4862163.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "bathroom",
        "stock": 54,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-032",
        "slug": "haczyk-na-recznik",
        "name_pl": "Haczyk na ręcznik",
        "name_uk": "Гачок для рушника",
        "description_pl": "Prosty haczyk ścienny na ręcznik lub szlafrok.",
        "description_uk": "Простий настінний гачок для рушника або халата.",
        "price": 12.99,
        "image_url": "https://images.pexels.com/photos/4194709/pexels-photo-4194709.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4194709/pexels-photo-4194709.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "bathroom",
        "stock": 61,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-033",
        "slug": "pojemnik-na-szczoteczki",
        "name_pl": "Pojemnik na szczoteczki",
        "name_uk": "Стакан для зубних щіток",
        "description_pl": "Pojemnik porządkujący szczoteczki i małe akcesoria.",
        "description_uk": "Стакан для впорядкування щіток і дрібних аксесуарів.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bathroom",
        "stock": 11,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-034",
        "slug": "organizer-pod-prysznic",
        "name_pl": "Organizer pod prysznic",
        "name_uk": "Органайзер у душ",
        "description_pl": "Półka na szampon, żel i kosmetyki pod prysznicem.",
        "description_uk": "Полиця для шампуню, гелю та косметики в душі.",
        "price": 29.99,
        "image_url": "https://images.pexels.com/photos/4862163/pexels-photo-4862163.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4862163/pexels-photo-4862163.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "bathroom",
        "stock": 18,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-035",
        "slug": "sciagaczka-do-szyb",
        "name_pl": "Ściągaczka do szyb",
        "name_uk": "Скребок для скла",
        "description_pl": "Mała ściągaczka do szyb, luster i kabiny prysznicowej.",
        "description_uk": "Малий скребок для скла, дзеркал і душової кабіни.",
        "price": 18.99,
        "image_url": "https://images.pexels.com/photos/4194709/pexels-photo-4194709.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/4194709/pexels-photo-4194709.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "bathroom",
        "stock": 25,
        "is_available": true
    },
    {
        "sku": "SZU-BATH-036",
        "slug": "koszyk-na-kosmetyki",
        "name_pl": "Koszyk na kosmetyki",
        "name_uk": "Кошик для косметики",
        "description_pl": "Lekki koszyk do przechowywania kosmetyków łazienkowych.",
        "description_uk": "Легкий кошик для зберігання ванної косметики.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bathroom",
        "stock": 32,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-037",
        "slug": "organizer-do-szuflady-na-sztucce",
        "name_pl": "Organizer do szuflady na sztućce",
        "name_uk": "Органайзер у шухляду для приборів",
        "description_pl": "Wkład do szuflady pomagający uporządkować sztućce i akcesoria.",
        "description_uk": "Вкладка в шухляду для впорядкування приборів та аксесуарів.",
        "price": 29.99,
        "image_url": "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "organization",
        "stock": 39,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-038",
        "slug": "pudelko-na-drobiazgi",
        "name_pl": "Pudełko na drobiazgi",
        "name_uk": "Коробка для дрібниць",
        "description_pl": "Małe pudełko na akcesoria, baterie i rzeczy bez stałego miejsca.",
        "description_uk": "Мала коробка для аксесуарів, батарейок і речей без місця.",
        "price": 15.99,
        "image_url": "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "organization",
        "stock": 46,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-039",
        "slug": "magnetyczny-uchwyt-na-dlugopis",
        "name_pl": "Magnetyczny uchwyt na długopis",
        "name_uk": "Магнітний тримач для ручки",
        "description_pl": "Uchwyt na lodówkę idealny do list zakupów i kalendarza.",
        "description_uk": "Тримач на холодильник, ідеальний для списків покупок і календаря.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "organization",
        "stock": 53,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-040",
        "slug": "etykiety-do-pojemnikow",
        "name_pl": "Etykiety do pojemników",
        "name_uk": "Етикетки для контейнерів",
        "description_pl": "Zestaw etykiet do opisania pudełek, słoików i organizerów.",
        "description_uk": "Набір етикеток для коробок, банок і органайзерів.",
        "price": 10.99,
        "image_url": "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "organization",
        "stock": 60,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-041",
        "slug": "organizer-na-kable",
        "name_pl": "Organizer na kable",
        "name_uk": "Органайзер для кабелів",
        "description_pl": "Zestaw opasek i klipsów do ładowarek oraz przewodów.",
        "description_uk": "Набір стяжок і кліпсів для зарядок та проводів.",
        "price": 13.99,
        "image_url": "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "organization",
        "stock": 10,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-042",
        "slug": "pojemnik-na-dokumenty",
        "name_pl": "Pojemnik na dokumenty",
        "name_uk": "Контейнер для документів",
        "description_pl": "Pudełko do rachunków, instrukcji i domowych dokumentów.",
        "description_uk": "Коробка для рахунків, інструкцій і домашніх документів.",
        "price": 26.99,
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "organization",
        "stock": 17,
        "is_available": true
    },
    {
        "sku": "SZU-ORGA-043",
        "slug": "przezroczysty-organizer-lazienkowy",
        "name_pl": "Przezroczysty organizer łazienkowy",
        "name_uk": "Прозорий органайзер для ванної",
        "description_pl": "Organizer na kosmetyki, gumki i małe akcesoria.",
        "description_uk": "Органайзер для косметики, резинок і дрібних аксесуарів.",
        "price": 24.99,
        "image_url": "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/9646744/pexels-photo-9646744.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "organization",
        "stock": 24,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-044",
        "slug": "olejarka-do-zawiasow",
        "name_pl": "Olejarka do zawiasów",
        "name_uk": "Маслянка для дверних петель",
        "description_pl": "Domowy niezbędnik do skrzypiących zawiasów i prowadnic.",
        "description_uk": "Домашня необхідність для скрипучих петель і направляючих.",
        "price": 13.99,
        "image_url": "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "home-care",
        "stock": 31,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-045",
        "slug": "zestaw-filcow-ochronnych",
        "name_pl": "Zestaw filców ochronnych",
        "name_uk": "Набір захисних фетрових накладок",
        "description_pl": "Podkładki chroniące podłogi i meble przed zarysowaniami.",
        "description_uk": "Накладки, що захищають підлогу і меблі від подряпин.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "home-care",
        "stock": 38,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-046",
        "slug": "tasma-naprawcza-przezroczysta",
        "name_pl": "Taśma naprawcza przezroczysta",
        "name_uk": "Прозора ремонтна стрічка",
        "description_pl": "Mocna taśma do drobnych domowych napraw.",
        "description_uk": "Міцна стрічка для дрібних домашніх ремонтів.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "home-care",
        "stock": 45,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-047",
        "slug": "szczotka-do-fug",
        "name_pl": "Szczotka do fug",
        "name_uk": "Щітка для швів плитки",
        "description_pl": "Wąska szczotka do fug, krawędzi i trudno dostępnych miejsc.",
        "description_uk": "Вузька щітка для швів, країв і важкодоступних місць.",
        "price": 10.99,
        "image_url": "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "home-care",
        "stock": 52,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-048",
        "slug": "zapasowe-slizgacze-do-krzesel",
        "name_pl": "Zapasowe ślizgacze do krzeseł",
        "name_uk": "Запасні ковзачки для стільців",
        "description_pl": "Elementy zmniejszające hałas i chroniące podłogę.",
        "description_uk": "Елементи, що зменшують шум і захищають підлогу.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "home-care",
        "stock": 59,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-049",
        "slug": "mini-zestaw-naprawczy",
        "name_pl": "Mini zestaw naprawczy",
        "name_uk": "Міні-набір для ремонту",
        "description_pl": "Mały zestaw przydatny do szybkich napraw w domu.",
        "description_uk": "Малий набір для швидких домашніх ремонтів.",
        "price": 19.99,
        "image_url": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "home-care",
        "stock": 9,
        "is_available": true
    },
    {
        "sku": "SZU-HOME-050",
        "slug": "miarka-zwijana-3-m",
        "name_pl": "Miarka zwijana 3 m",
        "name_uk": "Рулетка 3 м",
        "description_pl": "Kompaktowa miarka do mierzenia mebli, półek i dodatków.",
        "description_uk": "Компактна рулетка для вимірювання меблів, полиць і аксесуарів.",
        "price": 11.99,
        "image_url": "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/12826687/pexels-photo-12826687.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "home-care",
        "stock": 16,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-051",
        "slug": "kosz-na-pranie-skladany",
        "name_pl": "Kosz na pranie składany",
        "name_uk": "Складаний кошик для білизни",
        "description_pl": "Lekki kosz, który można złożyć po użyciu.",
        "description_uk": "Легкий кошик, який можна скласти після використання.",
        "price": 34.99,
        "image_url": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 23,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-052",
        "slug": "woreczki-do-prania-3-szt",
        "name_pl": "Woreczki do prania 3 szt.",
        "name_uk": "Мішечки для прання 3 шт.",
        "description_pl": "Woreczki chroniące delikatne ubrania w pralce.",
        "description_uk": "Мішечки, що захищають делікатний одяг у пральній машині.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 30,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-053",
        "slug": "kule-do-suszarki",
        "name_pl": "Kule do suszarki",
        "name_uk": "Кулі для сушарки",
        "description_pl": "Akcesoria pomagające rozdzielać ubrania podczas suszenia.",
        "description_uk": "Аксесуари, що допомагають розділяти одяг під час сушіння.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 37,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-054",
        "slug": "organizer-na-kapsulki-do-prania",
        "name_pl": "Organizer na kapsułki do prania",
        "name_uk": "Органайзер для капсул прання",
        "description_pl": "Pojemnik do bezpiecznego przechowywania kapsułek i proszku.",
        "description_uk": "Контейнер для безпечного зберігання капсул і порошку.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 44,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-055",
        "slug": "klipsy-do-suszenia-skarpet",
        "name_pl": "Klipsy do suszenia skarpet",
        "name_uk": "Кліпси для сушіння шкарпеток",
        "description_pl": "Zestaw małych klipsów ułatwiających suszenie drobnych rzeczy.",
        "description_uk": "Набір малих кліпсів для сушіння дрібних речей.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 51,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-056",
        "slug": "skladany-wieszak-na-pranie",
        "name_pl": "Składany wieszak na pranie",
        "name_uk": "Складана вішалка для прання",
        "description_pl": "Wieszak do suszenia koszulek, bielizny i ręczników.",
        "description_uk": "Вішалка для сушіння футболок, білизни і рушників.",
        "price": 27.99,
        "image_url": "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 58,
        "is_available": true
    },
    {
        "sku": "SZU-LAUN-057",
        "slug": "miarka-do-detergentu",
        "name_pl": "Miarka do detergentu",
        "name_uk": "Мірна ложка для прального засобу",
        "description_pl": "Prosta miarka pomagająca dozować proszek lub płyn.",
        "description_uk": "Проста мірка для дозування порошку або рідини.",
        "price": 7.99,
        "image_url": "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "laundry",
        "stock": 8,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-058",
        "slug": "sciereczki-z-mikrofibry-5-szt",
        "name_pl": "Ściereczki z mikrofibry 5 szt.",
        "name_uk": "Серветки з мікрофібри 5 шт.",
        "description_pl": "Zestaw miękkich ściereczek do kuchni, łazienki i kurzu.",
        "description_uk": "Набір мʼяких серветок для кухні, ванної і пилу.",
        "price": 15.99,
        "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 15,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-059",
        "slug": "szczotka-do-trudno-dostepnych-miejsc",
        "name_pl": "Szczotka do trudno dostępnych miejsc",
        "name_uk": "Щітка для важкодоступних місць",
        "description_pl": "Wąska szczotka do krawędzi, szpar i narożników.",
        "description_uk": "Вузька щітка для країв, щілин і кутів.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 22,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-060",
        "slug": "butelka-z-atomizerem",
        "name_pl": "Butelka z atomizerem",
        "name_uk": "Пляшка з розпилювачем",
        "description_pl": "Butelka do domowych środków czystości i wody.",
        "description_uk": "Пляшка для домашніх засобів для чищення і води.",
        "price": 11.99,
        "image_url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 29,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-061",
        "slug": "rekawice-do-sprzatania",
        "name_pl": "Rękawice do sprzątania",
        "name_uk": "Рукавички для прибирання",
        "description_pl": "Wygodne rękawice ochronne do codziennego sprzątania.",
        "description_uk": "Зручні захисні рукавички для щоденного прибирання.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 36,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-062",
        "slug": "gabka-melaminowa-10-szt",
        "name_pl": "Gąbka melaminowa 10 szt.",
        "name_uk": "Меламінова губка 10 шт.",
        "description_pl": "Zestaw gąbek do usuwania uporczywych śladów.",
        "description_uk": "Набір губок для видалення стійких слідів.",
        "price": 13.99,
        "image_url": "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 43,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-063",
        "slug": "mini-zmiotka-z-szufelka",
        "name_pl": "Mini zmiotka z szufelką",
        "name_uk": "Міні-щітка з совком",
        "description_pl": "Mały zestaw do szybkiego sprzątania blatu i podłogi.",
        "description_uk": "Малий набір для швидкого прибирання стільниці і підлоги.",
        "price": 16.99,
        "image_url": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 50,
        "is_available": true
    },
    {
        "sku": "SZU-CLEA-064",
        "slug": "sciagaczka-do-blatu",
        "name_pl": "Ściągaczka do blatu",
        "name_uk": "Скребок для стільниці",
        "description_pl": "Mała ściągaczka do wody i okruchów na blacie.",
        "description_uk": "Малий скребок для води та крихт на стільниці.",
        "price": 8.99,
        "image_url": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "cleaning",
        "stock": 57,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-065",
        "slug": "pojemnik-z-pokrywka",
        "name_pl": "Pojemnik z pokrywką",
        "name_uk": "Контейнер із кришкою",
        "description_pl": "Uniwersalny pojemnik do szafy, łazienki lub spiżarni.",
        "description_uk": "Універсальний контейнер для шафи, ванної або комори.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "storage",
        "stock": 64,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-066",
        "slug": "przezroczyste-pudelko-do-szafy",
        "name_pl": "Przezroczyste pudełko do szafy",
        "name_uk": "Прозора коробка для шафи",
        "description_pl": "Pudełko pozwalające łatwo zobaczyć zawartość.",
        "description_uk": "Коробка, у якій легко побачити вміст.",
        "price": 24.99,
        "image_url": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "storage",
        "stock": 14,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-067",
        "slug": "koszyk-do-przechowywania",
        "name_pl": "Koszyk do przechowywania",
        "name_uk": "Кошик для зберігання",
        "description_pl": "Lekki koszyk na tekstylia, kosmetyki lub akcesoria.",
        "description_uk": "Легкий кошик для текстилю, косметики або аксесуарів.",
        "price": 21.99,
        "image_url": "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "storage",
        "stock": 21,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-068",
        "slug": "worki-prozniowe-3-szt",
        "name_pl": "Worki próżniowe 3 szt.",
        "name_uk": "Вакуумні пакети 3 шт.",
        "description_pl": "Worki do sezonowego przechowywania ubrań i pościeli.",
        "description_uk": "Пакети для сезонного зберігання одягу і постелі.",
        "price": 29.99,
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "storage",
        "stock": 28,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-069",
        "slug": "organizer-wiszacy",
        "name_pl": "Organizer wiszący",
        "name_uk": "Підвісний органайзер",
        "description_pl": "Organizer do szafy, drzwi lub małej garderoby.",
        "description_uk": "Органайзер для шафи, дверей або маленької гардеробної.",
        "price": 32.99,
        "image_url": "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "storage",
        "stock": 35,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-070",
        "slug": "pudelko-na-akcesoria-sezonowe",
        "name_pl": "Pudełko na akcesoria sezonowe",
        "name_uk": "Коробка для сезонних речей",
        "description_pl": "Pudełko na świece, dekoracje, kable i drobne zapasy.",
        "description_uk": "Коробка для свічок, декору, кабелів і дрібних запасів.",
        "price": 19.99,
        "image_url": "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200",
        "image_urls": [
            "https://images.pexels.com/photos/3722563/pexels-photo-3722563.jpeg?auto=compress&cs=tinysrgb&w=1200"
        ],
        "category": "storage",
        "stock": 42,
        "is_available": true
    },
    {
        "sku": "SZU-STOR-071",
        "slug": "separator-do-polki",
        "name_pl": "Separator do półki",
        "name_uk": "Розділювач для полиці",
        "description_pl": "Separator pomagający utrzymać równe stosy ubrań lub ręczników.",
        "description_uk": "Розділювач, що допомагає тримати рівні стопки одягу чи рушників.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "storage",
        "stock": 49,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-072",
        "slug": "organizer-na-stolik-nocny",
        "name_pl": "Organizer na stolik nocny",
        "name_uk": "Органайзер на тумбочку",
        "description_pl": "Mały organizer na ładowarkę, książkę i drobne rzeczy przy łóżku.",
        "description_uk": "Малий органайзер для зарядки, книжки і дрібниць біля ліжка.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 56,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-073",
        "slug": "pudelko-pod-lozko",
        "name_pl": "Pudełko pod łóżko",
        "name_uk": "Коробка під ліжко",
        "description_pl": "Niskie pudełko do przechowywania pościeli lub sezonowych ubrań.",
        "description_uk": "Низька коробка для постелі або сезонного одягу.",
        "price": 35.99,
        "image_url": "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 63,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-074",
        "slug": "opaska-do-kabli-przy-lozku",
        "name_pl": "Opaska do kabli przy łóżku",
        "name_uk": "Стяжка для кабелів біля ліжка",
        "description_pl": "Proste rozwiązanie na ładowarki i przewody przy stoliku nocnym.",
        "description_uk": "Просте рішення для зарядок і проводів біля тумбочки.",
        "price": 7.99,
        "image_url": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 13,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-075",
        "slug": "woreczek-na-bizuterie",
        "name_pl": "Woreczek na biżuterię",
        "name_uk": "Мішечок для прикрас",
        "description_pl": "Miękki woreczek na pierścionki, kolczyki i drobną biżuterię.",
        "description_uk": "Мʼякий мішечок для каблучок, сережок і дрібних прикрас.",
        "price": 10.99,
        "image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 20,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-076",
        "slug": "pokrowiec-na-posciel",
        "name_pl": "Pokrowiec na pościel",
        "name_uk": "Чохол для постелі",
        "description_pl": "Pokrowiec chroniący zapasową pościel przed kurzem.",
        "description_uk": "Чохол, що захищає запасну постіль від пилу.",
        "price": 24.99,
        "image_url": "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 27,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-077",
        "slug": "tacka-na-bizuterie",
        "name_pl": "Tacka na biżuterię",
        "name_uk": "Піднос для прикрас",
        "description_pl": "Mała tacka na biżuterię, zegarek i rzeczy zdejmowane przed snem.",
        "description_uk": "Малий піднос для прикрас, годинника і речей перед сном.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 34,
        "is_available": true
    },
    {
        "sku": "SZU-BEDR-078",
        "slug": "zestaw-klipsow-do-przescieradla",
        "name_pl": "Zestaw klipsów do prześcieradła",
        "name_uk": "Набір кліпсів для простирадла",
        "description_pl": "Klipsy pomagające utrzymać prześcieradło na miejscu.",
        "description_uk": "Кліпси, що допомагають утримувати простирадло на місці.",
        "price": 13.99,
        "image_url": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "bedroom",
        "stock": 41,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-079",
        "slug": "organizer-na-biurko",
        "name_pl": "Organizer na biurko",
        "name_uk": "Органайзер на стіл",
        "description_pl": "Organizer na długopisy, karteczki i drobne akcesoria biurowe.",
        "description_uk": "Органайзер для ручок, стікерів і дрібних офісних аксесуарів.",
        "price": 26.99,
        "image_url": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 48,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-080",
        "slug": "podstawka-pod-laptop",
        "name_pl": "Podstawka pod laptop",
        "name_uk": "Підставка під ноутбук",
        "description_pl": "Prosta podstawka poprawiająca wygodę pracy przy biurku.",
        "description_uk": "Проста підставка, що покращує зручність роботи за столом.",
        "price": 44.99,
        "image_url": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 55,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-081",
        "slug": "klipsy-do-kabli-na-biurko",
        "name_pl": "Klipsy do kabli na biurko",
        "name_uk": "Кліпси для кабелів на стіл",
        "description_pl": "Zestaw klipsów do ładowarek i przewodów USB.",
        "description_uk": "Набір кліпсів для зарядок і USB-кабелів.",
        "price": 10.99,
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 62,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-083",
        "slug": "podkladka-pod-mysz",
        "name_pl": "Podkładka pod mysz",
        "name_uk": "Килимок для миші",
        "description_pl": "Gładka podkładka do codziennej pracy przy komputerze.",
        "description_uk": "Гладкий килимок для щоденної роботи за компʼютером.",
        "price": 14.99,
        "image_url": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 19,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-084",
        "slug": "mini-kosz-na-biurko",
        "name_pl": "Mini kosz na biurko",
        "name_uk": "Міні-смітник на стіл",
        "description_pl": "Mały pojemnik na papierki, metki i drobne odpady.",
        "description_uk": "Малий контейнер для папірців, бірок і дрібного сміття.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 26,
        "is_available": true
    },
    {
        "sku": "SZU-OFFI-085",
        "slug": "stojak-na-telefon",
        "name_pl": "Stojak na telefon",
        "name_uk": "Підставка для телефону",
        "description_pl": "Kompaktowy stojak na telefon do pracy, nauki i gotowania.",
        "description_uk": "Компактна підставка для телефону для роботи, навчання і готування.",
        "price": 15.99,
        "image_url": "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "office",
        "stock": 33,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-086",
        "slug": "pojemnik-na-makaron",
        "name_pl": "Pojemnik na makaron",
        "name_uk": "Контейнер для макаронів",
        "description_pl": "Wysoki pojemnik do przechowywania makaronu i produktów sypkich.",
        "description_uk": "Високий контейнер для макаронів і сипучих продуктів.",
        "price": 22.99,
        "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 40,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-087",
        "slug": "sloiki-z-etykietami-3-szt",
        "name_pl": "Słoiki z etykietami 3 szt.",
        "name_uk": "Банки з етикетками 3 шт.",
        "description_pl": "Zestaw słoików do kasz, płatków i przypraw.",
        "description_uk": "Набір банок для круп, пластівців і спецій.",
        "price": 29.99,
        "image_url": "https://images.unsplash.com/photo-1584473457409-ae5c91d7d8f0?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1584473457409-ae5c91d7d8f0?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 47,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-088",
        "slug": "miarka-do-produktow-sypkich",
        "name_pl": "Miarka do produktów sypkich",
        "name_uk": "Мірка для сипучих продуктів",
        "description_pl": "Mała miarka do ryżu, mąki, płatków i cukru.",
        "description_uk": "Мала мірка для рису, борошна, пластівців і цукру.",
        "price": 8.99,
        "image_url": "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 54,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-089",
        "slug": "klipsy-do-paczek-spozywczych",
        "name_pl": "Klipsy do paczek spożywczych",
        "name_uk": "Кліпси для харчових пакетів",
        "description_pl": "Klipsy do zamykania kawy, makaronu i przekąsek.",
        "description_uk": "Кліпси для кави, макаронів і снеків.",
        "price": 9.99,
        "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 61,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-090",
        "slug": "organizer-na-przyprawy",
        "name_pl": "Organizer na przyprawy",
        "name_uk": "Органайзер для спецій",
        "description_pl": "Półka pomagająca uporządkować słoiczki z przyprawami.",
        "description_uk": "Полиця для впорядкування баночок зі спеціями.",
        "price": 24.99,
        "image_url": "https://images.unsplash.com/photo-1584473457409-ae5c91d7d8f0?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1584473457409-ae5c91d7d8f0?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 11,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-091",
        "slug": "pojemnik-na-cebule-i-czosnek",
        "name_pl": "Pojemnik na cebulę i czosnek",
        "name_uk": "Контейнер для цибулі і часнику",
        "description_pl": "Oddychający pojemnik do przechowywania warzyw w kuchni.",
        "description_uk": "Контейнер із вентиляцією для зберігання овочів на кухні.",
        "price": 18.99,
        "image_url": "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1615484477778-ca3b77940c25?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 18,
        "is_available": true
    },
    {
        "sku": "SZU-PANT-092",
        "slug": "koszyk-do-spizarni",
        "name_pl": "Koszyk do spiżarni",
        "name_uk": "Кошик для комори",
        "description_pl": "Koszyk na zapasy, paczki i produkty, które trudno ustawić na półce.",
        "description_uk": "Кошик для запасів, пакетів і продуктів, які важко поставити на полиці.",
        "price": 20.99,
        "image_url": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "pantry",
        "stock": 25,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-093",
        "slug": "tacka-na-klucze",
        "name_pl": "Tacka na klucze",
        "name_uk": "Піднос для ключів",
        "description_pl": "Mała tacka przy wejściu na klucze, monety i drobiazgi.",
        "description_uk": "Малий піднос біля входу для ключів, монет і дрібниць.",
        "price": 17.99,
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 32,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-094",
        "slug": "haczyk-na-torbe",
        "name_pl": "Haczyk na torbę",
        "name_uk": "Гачок для сумки",
        "description_pl": "Ścienny haczyk do toreb, plecaków i zakupów.",
        "description_uk": "Настінний гачок для сумок, рюкзаків і покупок.",
        "price": 12.99,
        "image_url": "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 39,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-095",
        "slug": "organizer-na-listy",
        "name_pl": "Organizer na listy",
        "name_uk": "Органайзер для листів",
        "description_pl": "Pojemnik na pocztę, rachunki i dokumenty przy wejściu.",
        "description_uk": "Контейнер для пошти, рахунків і документів біля входу.",
        "price": 23.99,
        "image_url": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 46,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-096",
        "slug": "mata-pod-buty",
        "name_pl": "Mata pod buty",
        "name_uk": "Килимок під взуття",
        "description_pl": "Praktyczna mata chroniąca podłogę przed wodą i piaskiem.",
        "description_uk": "Практичний килимок, що захищає підлогу від води і піску.",
        "price": 31.99,
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 53,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-097",
        "slug": "pudelko-na-akcesoria-zimowe",
        "name_pl": "Pudełko na akcesoria zimowe",
        "name_uk": "Коробка для зимових аксесуарів",
        "description_pl": "Pudełko na rękawiczki, czapki i szaliki w przedpokoju.",
        "description_uk": "Коробка для рукавичок, шапок і шарфів у передпокої.",
        "price": 25.99,
        "image_url": "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 60,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-098",
        "slug": "wieszak-samoprzylepny-3-szt",
        "name_pl": "Wieszak samoprzylepny 3 szt.",
        "name_uk": "Самоклейна вішалка 3 шт.",
        "description_pl": "Zestaw haczyków bez wiercenia do przedpokoju lub garderoby.",
        "description_uk": "Набір гачків без свердління для передпокою або гардеробу.",
        "price": 15.99,
        "image_url": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 10,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-099",
        "slug": "koszyk-na-kapcie",
        "name_pl": "Koszyk na kapcie",
        "name_uk": "Кошик для домашнього взуття",
        "description_pl": "Koszyk porządkujący kapcie i drobne rzeczy przy wejściu.",
        "description_uk": "Кошик для домашнього взуття і дрібниць біля входу.",
        "price": 26.99,
        "image_url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 17,
        "is_available": true
    },
    {
        "sku": "SZU-HALL-100",
        "slug": "stoper-do-drzwi",
        "name_pl": "Stoper do drzwi",
        "name_uk": "Стопер для дверей",
        "description_pl": "Mały stoper chroniący ścianę i drzwi przed uderzeniami.",
        "description_uk": "Малий стопер, що захищає стіну і двері від ударів.",
        "price": 10.99,
        "image_url": "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80",
        "image_urls": [
            "https://images.unsplash.com/photo-1618221639244-c1a8502c0eb9?auto=format&fit=crop&w=1200&q=80"
        ],
        "category": "hallway",
        "stock": 24,
        "is_available": true
    }
];
