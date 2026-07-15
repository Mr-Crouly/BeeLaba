// =======================
// АНИМАЦИЯ ПОЯВЛЕНИЯ
// =======================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".fade").forEach(section => {
    observer.observe(section);
});

// =======================
// ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ
// =======================

const translations = {

    ru: {

        home: "Главная",
        history: "История",
        apiary: "Пасека",
        catalog: "Каталог",
        order: "Заказать",
        contacts: "Контакты",

        heroTitle: "Натуральный мёд из самого севера Молдовы",

        heroText:
        "NecteVia Moldova — натуральная продукция пчеловодства с собственной пасеки.",

        catalogBtn: "Каталог",
        orderBtn: "Заказать",

        historyTitle: "История Nectevia",

        historyText1:
        "NecteVia Moldova — семейная пасека, которая производит натуральный мёд уже много лет.",

        historyText2:
        "Мы заботимся о каждой пчелиной семье, контролируем качество продукции и используем современные технологии.",

        apiaryTitle: "Наша пасека",

        feature1: "100+ ульев",
        feature2: "Экологично",
        feature3: "Высокое качество",
        feature4: "Доставка",

        product1Title: "Акациевый мёд",
        product1Desc: "Нежный вкус.",

        product2Title: "Липовый мёд",
        product2Desc: "Насыщенный аромат.",

        product3Title: "Цветочный",
        product3Desc: "Натуральный.",

        product4Title: "Пыльца",
        product4Desc: "Источник витаминов.",

        buyBtn: "Купить",

        pricesTitle: "Прайс",

        orderInfo: "Или оставьте вашу заявку, и мы свяжемся с вами в ближайшее время.",

        contactsTitle: "Контакты",

        formName: "Ваше имя",
        formPhone: "Телефон",
        formComment: "Комментарий",

        send: "Отправить",

        popupTitle: "Спасибо!",
        popupText: "Ваш заказ успешно отправлен.",
        popupClose: "Закрыть"
    },

    ro: {

        home: "Acasă",
        history: "Istorie",
        apiary: "Stupină",
        catalog: "Catalog",
        order: "Comandă",
        contacts: "Contacte",

        heroTitle: "Miere naturală din nordul Moldovei",

        heroText:
        "NecteVia Moldova — produse apicole naturale din propria stupină.",

        catalogBtn: "Catalog",
        orderBtn: "Comandă",

        historyTitle: "Istoria Nectevia",

        historyText1:
        "NecteVia Moldova este o stupină de familie care produce miere naturală de mulți ani.",

        historyText2:
        "Avem grijă de fiecare familie de albine, controlăm calitatea produselor și folosim tehnologii moderne.",

        apiaryTitle: "Stupina noastră",

        feature1: "100+ stupi",
        feature2: "Ecologic",
        feature3: "Calitate înaltă",
        feature4: "Livrare",

        product1Title: "Miere de salcâm",
        product1Desc: "Gust delicat.",

        product2Title: "Miere de tei",
        product2Desc: "Aromă intensă.",

        product3Title: "Miere florală",
        product3Desc: "Naturală.",

        product4Title: "Polen",
        product4Desc: "Sursă de vitamine.",

        buyBtn: "Cumpără",

        pricesTitle: "Prețuri",

        contactsTitle: "Contacte",

        orderInfo: "Sau trimiteți o solicitare și vă vom contacta în scurt timp.",

        formName: "Numele dvs.",
        formPhone: "Telefon",
        formComment: "Comentariu",

        send: "Trimite",

        popupTitle: "Mulțumim!",
        popupText: "Comanda dvs. a fost trimisă cu succes.",
        popupClose: "Închide"
    }
};

function setLanguage(lang){

    const t = translations[lang];

    if(!t) return;

    // Обычный текст (заголовки, кнопки, пункты меню и т.д.)
    document.querySelectorAll("[data-i18n]").forEach(el => {

        const key = el.getAttribute("data-i18n");

        if(t[key] !== undefined){
            el.textContent = t[key];
        }
    });

    // Плейсхолдеры полей формы
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {

        const key = el.getAttribute("data-i18n-placeholder");

        if(t[key] !== undefined){
            el.placeholder = t[key];
        }
    });

    // Подсветка активной кнопки языка
    const ruBtn = document.getElementById("ru");
    const roBtn = document.getElementById("ro");

    if(ruBtn) ruBtn.classList.toggle("active", lang === "ru");
    if(roBtn) roBtn.classList.toggle("active", lang === "ro");

    document.documentElement.lang = lang;

    localStorage.setItem(
        "beelab_language",
        lang
    );
}

const savedLanguage =
    localStorage.getItem(
        "beelab_language"
    ) || "ru";

setLanguage(savedLanguage);

const ruBtn =
    document.getElementById("ru");

const roBtn =
    document.getElementById("ro");

if(ruBtn){
    ruBtn.addEventListener(
        "click",
        () => setLanguage("ru")
    );
}

if(roBtn){
    roBtn.addEventListener(
        "click",
        () => setLanguage("ro")
    );
}

// =======================
// БУРГЕР-МЕНЮ (МОБИЛЬНАЯ ВЕРСИЯ)
// =======================

const burger = document.getElementById("burger");
const navList = document.getElementById("navList");

if(burger && navList){

    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        navList.classList.toggle("open");
    });

    // закрывать меню при клике на пункт меню
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("open");
            navList.classList.remove("open");
        });
    });

    // закрывать меню, если экран увеличили до десктопного размера
    window.addEventListener("resize", () => {
        if(window.innerWidth > 900){
            burger.classList.remove("open");
            navList.classList.remove("open");
        }
    });
}

// =======================
// ПРОВЕРКА ФОРМЫ
// =======================

const form =
    document.querySelector("form");

// =======================
// ПЛАВНАЯ ПРОКРУТКА
// =======================

document
.querySelectorAll('a[href^="#"]')
.forEach(link => {

    link.addEventListener(
        "click",
        function(event){

            event.preventDefault();

            const target =
                document.querySelector(
                    this.getAttribute("href")
                );

            if(target){

                target.scrollIntoView({
                    behavior:"smooth"
                });
            }
        }
    );

});

// =======================
// АКТИВНЫЙ ПУНКТ МЕНЮ
// =======================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll("nav a");

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop - 150;

            const height =
                section.offsetHeight;

            if(
                pageYOffset >= top &&
                pageYOffset < top + height
            ){
                current =
                    section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if(
                link.getAttribute("href") ===
                "#" + current
            ){
                link.classList.add(
                    "active"
                );
            }

        });

    }
);
if(form){

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const name =
            document.querySelector(
                'input[type="text"]'
            ).value.trim();

        const phone =
            document.querySelector(
                'input[type="tel"]'
            ).value.trim();

        if(name.length < 2){
            alert("Введите имя");
            return;
        }

        if(phone.length < 5){
            alert("Введите телефон");
            return;
        }

        const data = new FormData(form);

        fetch("send.php", {

            method: "POST",

            body: data

        })

        .then(res => res.text())

        .then(res => {

            if(res.trim() === "success"){

                document.getElementById("popup").style.display = "flex";

                form.reset();

            } else {

                alert("Ошибка отправки. Попробуйте ещё раз.");

            }

        })

        .catch(() => {

            alert("Ошибка соединения. Попробуйте ещё раз.");

        });

    });

}

function closePopup(){

    document.getElementById("popup").style.display="none";

}