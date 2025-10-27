// ==================== Navigation Menu Toggle ====================
let menus = document.querySelector('nav');
let menuBtn = document.querySelector('.menu-btn');
let closeBTN = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => menus.classList.add('active'));
closeBTN.addEventListener('click', () => menus.classList.remove('active'));


// ==================== Swiper JS ====================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    slidePerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        },
    }
});


// ==================== Dynamic Menu Section ====================
const SectionCenter = document.querySelector('.menus_items_container');
const filterBtns = document.querySelectorAll('.btn-cat');

const menu = [
    { id: 1, title: "Chicken and Cashews", Catagory: "Dinner", price: 25, img: "./img/food_lover_1.jpg" },
    { id: 2, title: "Chicken and Cashews", Catagory: "Lunch", price: 25, img: "./img/food_lover_2.jpg" },
    { id: 3, title: "Chicken and Cashews", Catagory: "Drinks", price: 25, img: "./img/food_lover_3.jpg" },
    { id: 4, title: "Chicken and Cashews", Catagory: "Starter", price: 25, img: "./img/food_lover_4.jpg" },
    { id: 5, title: "Chicken and Cashews", Catagory: "Drinks", price: 25, img: "./img/food_lover_5.jpg" },
    { id: 6, title: "Chicken and Cashews", Catagory: "Starter", price: 25, img: "./img/food_lover_6.jpg" },
    { id: 7, title: "Chicken and Cashews", Catagory: "Dinner", price: 25, img: "./img/food_lover_7.jpg" },
    { id: 8, title: "Chicken and Cashews", Catagory: "Lunch", price: 25, img: "./img/food_lover_8.jpg" },
    { id: 9, title: "Chicken and Cashews", Catagory: "Lunch", price: 25, img: "./img/food_lover_9.jpg" }
];

// Load all menu items on page load
window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menu);
});

// Filter by category
filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        const Catagory = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(item => item.Catagory === Catagory);
        displayMenuItems(Catagory === 'all' ? menu : menuCategory);
    });
});

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(item => `
        <div class="img_cards">
            <img src="${item.img}" alt="${item.title}"/>
            <p class="price">Only On ${item.price} Dollars</p>
            <p>${item.title}</p>
        </div>
    `).join("");
    SectionCenter.innerHTML = displayMenu;
}


// ==================== Animated Counter Numbers ====================
const countersEl = document.querySelectorAll('.num');

countersEl.forEach(counterEl => {
    counterEl.innerText = '0';
    increaseCounter();

    function increaseCounter() {
        let currentNum = +counterEl.innerText;
        const dataCeil = +counterEl.getAttribute('data-ceil');
        const increment = dataCeil / 15;
        currentNum = Math.ceil(currentNum + increment);

        if (currentNum < dataCeil) {
            counterEl.innerText = currentNum;
            setTimeout(increaseCounter, 70);
        } else {
            counterEl.innerText = dataCeil;
        }
    }
});


// ==================== Sticky Header ====================
const nav = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});


// ==================== Parallax Background ====================
const Parallax = document.querySelector('#showcase');
window.addEventListener('scroll', () => {
    let offset = window.pageYOffset;
    Parallax.style.backgroundPositionY = offset * 0.7 + "px";
});
