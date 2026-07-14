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
        "Nectevia Moldova — натуральная продукция пчеловодства с собственной пасеки.",

        catalogBtn: "Каталог",
        orderBtn: "Заказать",

        historyTitle: "История Nectevia",

        historyText:
        "Nectevia Moldova — семейная пасека, которая производит натуральный мёд и продукты пчеловодства.",

        apiaryTitle: "Наша пасека",

        pricesTitle: "Прайс",

        contactsTitle: "Контакты",

        formName: "Ваше имя",
        formPhone: "Телефон",
        formComment: "Комментарий",

        send: "Отправить",

        success:
        "Спасибо! Мы свяжемся с вами."
    },

    ro: {

        home: "Acasă",
        history: "Istorie",
        apiary: "Stupină",
        catalog: "Catalog",
        order: "Comandă",
        contacts: "Contacte",

        heroTitle: "Miere naturală din inima Moldovei",

        heroText:
        "BeeLab Moldova — produse apicole naturale din propria stupină.",

        catalogBtn: "Catalog",
        orderBtn: "Comandă",

        historyTitle: "Istoria BeeLab",

        historyText:
        "BeeLab Moldova este o stupină de familie care produce miere naturală și produse apicole.",

        apiaryTitle: "Stupina noastră",

        pricesTitle: "Prețuri",

        contactsTitle: "Contacte",

        formName: "Numele dvs.",
        formPhone: "Telefon",
        formComment: "Comentariu",

        send: "Trimite",

        success:
        "Mulțumim! Vă vom contacta."
    }
};

function setLanguage(lang){

    const t = translations[lang];

    if(!t) return;

    const navHome =
        document.querySelector('a[href="#home"]');
    if(navHome) navHome.textContent = t.home;

    const navHistory =
        document.querySelector('a[href="#history"]');
    if(navHistory) navHistory.textContent = t.history;

    const navApiary =
        document.querySelector('a[href="#apiary"]');
    if(navApiary) navApiary.textContent = t.apiary;

    const navProducts =
        document.querySelector('a[href="#products"]');
    if(navProducts) navProducts.textContent = t.catalog;

    const navPrices =
        document.querySelector('a[href="#prices"]');
    if(navPrices) navPrices.textContent = t.prices;

    const navContacts =
        document.querySelector('a[href="#contacts"]');
    if(navContacts) navContacts.textContent = t.contacts;

    const heroTitle =
        document.querySelector(".hero h1");

    if(heroTitle)
        heroTitle.textContent =
            t.heroTitle;

    const heroText =
        document.querySelector(".hero p");

    if(heroText)
        heroText.textContent =
            t.heroText;

    const btns =
        document.querySelectorAll(".hero a");

    if(btns.length >= 2){

        btns[0].textContent =
            t.catalogBtn;

        btns[1].textContent =
            t.orderBtn;
    }

    const formName =
        document.querySelector('input[type="text"]');

    if(formName)
        formName.placeholder =
            t.formName;

    const formPhone =
        document.querySelector('input[type="tel"]');

    if(formPhone)
        formPhone.placeholder =
            t.formPhone;

    const textarea =
        document.querySelector("textarea");

    if(textarea)
        textarea.placeholder =
            t.formComment;

    const sendBtn =
        document.querySelector("form button");

    if(sendBtn)
        sendBtn.textContent =
            t.send;

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