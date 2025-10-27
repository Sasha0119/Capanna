<<<<<<< HEAD
let menus = document.querySelector('nav');
let menuBtn = document.querySelector('.menu-btn');
let closeBTN = document.querySelector('.close-btn');

menuBtn.addEventListener('click', function(){
    menus.classList.add('active');
})

closeBTN.addEventListener('click', function(){
    menus.classList.remove('active');
})

// Swiper JS Code
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
// Dynamic Images

const SectioonCenter = document.querySelector('.menus_items_container');
const filterBtns = document.querySelectorAll('.btn-cat');

filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const Catagory = e.currentTarget.dataset.id;
        const menuCatagory = menu.filter(function(menuItem){
            if(menuItem.Catagory === Catagory){
                return menuItem;
            }
        });
        if(Catagory === 'all'){
            displayMenuItems(menu);
        } else {
            displayMenuItems(menuCatagory);
        }
    })
});

const menu = [
    {
        id: 1,
        title: "Chicken and Cashews",
        Catagory: "Dinner",
        price: 25,
        img: "./img/food_lover_1.jpg",
    },
    {
        id: 2,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_2.jpg",
    },
    {
        id: 3,
        title: "Chicken and Cashews",
        Catagory: "Drinks",
        price: 25,
        img: "./img/food_lover_3.jpg",
    },
    {
        id: 4,
        title: "Chicken and Cashews",
        Catagory: "Starter",
        price: 25,
        img: "./img/food_lover_4.jpg",
    },
    {
        id: 5,
        title: "Chicken and Cashews",
        Catagory: "Drinks",
        price: 25,
        img: "./img/food_lover_5.jpg",
    },
    {
        id: 6,
        title: "Chicken and Cashews",
        Catagory: "Starter",
        price: 25,
        img: "./img/food_lover_6.jpg",
    },
    {
        id: 7,
        title: "Chicken and Cashews",
        Catagory: "Dinner",
        price: 25,
        img: "./img/food_lover_7.jpg",
    },
    {
        id: 8,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_8.jpg",
    },
    {
        id: 9,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_9.jpg",
    }
]

window.addEventListener('DOMContentLoaded', function(){
    displayMenuItems(menu);
});
function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item){
        return `<div class="img_cards">
        <img src=${item.img} alt=""/>
        <p class="price">Only On ${item.price} Dollars</p>
        <p>${item.title}</p>
    </div>`;
    })
    displayMenuItems = displayMenuItems.join("");
    SectioonCenter.innerHTML = displayMenuItems;
}    

// static counter number start
const countersEl = document.querySelectorAll('.num');

countersEl.forEach(counterEl => {
    countersEl.innerText = '0';
    increaseCounter();

    function increaseCounter(){
        let currentNum = +counterEl.innerText;  
        const dataCeil = +counterEl.getAttribute('data-ceil');
        const increment = dataCeil / 15;
        currentNum = Math.ceil(currentNum + increment);

        if(currentNum < dataCeil){
            countersEl.innerText = currentNum;
            setTimeout(increaseCounter, 70);
        }
        else {
            countersEl.innerText = dataCeil;
        }
    }
});
// static counter number close

// sticky menus start
const nav = document.querySelector('header');

window.addEventListener('scroll', function(){
    if(this.document.documentElement.scrollTop > 20){
        nav.classList.add('sticky');
    } 
    else {
        nav.classList.remove('sticky');
    }
})
// sticky menus close

// parallax effect 
const Parallax = document.querySelector('#showcase');
window.addEventListener('scroll', function(){
    let offset = window.pageYOffset;
    Parallax.style.backgroundPositionY = offset * 0.7 + "px";
});
=======
let menus = document.querySelector('nav');
let menuBtn = document.querySelector('.menu-btn');
let closeBTN = document.querySelector('.close-btn');

menuBtn.addEventListener('click', function(){
    menus.classList.add('active');
})

closeBTN.addEventListener('click', function(){
    menus.classList.remove('active');
})

// Swiper JS Code
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
// Dynamic Images

const SectioonCenter = document.querySelector('.menus_items_container');
const filterBtns = document.querySelectorAll('.btn-cat');

filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(e){
        const Catagory = e.currentTarget.dataset.id;
        const menuCatagory = menu.filter(function(menuItem){
            if(menuItem.Catagory === Catagory){
                return menuItem;
            }
        });
        if(Catagory === 'all'){
            displayMenuItems(menu);
        } else {
            displayMenuItems(menuCatagory);
        }
    })
});

const menu = [
    {
        id: 1,
        title: "Chicken and Cashews",
        Catagory: "Dinner",
        price: 25,
        img: "./img/food_lover_1.jpg",
    },
    {
        id: 2,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_2.jpg",
    },
    {
        id: 3,
        title: "Chicken and Cashews",
        Catagory: "Drinks",
        price: 25,
        img: "./img/food_lover_3.jpg",
    },
    {
        id: 4,
        title: "Chicken and Cashews",
        Catagory: "Starter",
        price: 25,
        img: "./img/food_lover_4.jpg",
    },
    {
        id: 5,
        title: "Chicken and Cashews",
        Catagory: "Drinks",
        price: 25,
        img: "./img/food_lover_5.jpg",
    },
    {
        id: 6,
        title: "Chicken and Cashews",
        Catagory: "Starter",
        price: 25,
        img: "./img/food_lover_6.jpg",
    },
    {
        id: 7,
        title: "Chicken and Cashews",
        Catagory: "Dinner",
        price: 25,
        img: "./img/food_lover_7.jpg",
    },
    {
        id: 8,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_8.jpg",
    },
    {
        id: 9,
        title: "Chicken and Cashews",
        Catagory: "Lunch",
        price: 25,
        img: "./img/food_lover_9.jpg",
    }
]

window.addEventListener('DOMContentLoaded', function(){
    displayMenuItems(menu);
});
function displayMenuItems(menuItems){
    let displayMenu = menuItems.map(function(item){
        return `<div class="img_cards">
        <img src=${item.img} alt=""/>
        <p class="price">Only On ${item.price} Dollars</p>
        <p>${item.title}</p>
    </div>`;
    })
    displayMenuItems = displayMenuItems.join("");
    SectioonCenter.innerHTML = displayMenuItems;
}    

// static counter number start
const countersEl = document.querySelectorAll('.num');

countersEl.forEach(counterEl => {
    countersEl.innerText = '0';
    increaseCounter();

    function increaseCounter(){
        let currentNum = +counterEl.innerText;  
        const dataCeil = +counterEl.getAttribute('data-ceil');
        const increment = dataCeil / 15;
        currentNum = Math.ceil(currentNum + increment);

        if(currentNum < dataCeil){
            countersEl.innerText = currentNum;
            setTimeout(increaseCounter, 70);
        }
        else {
            countersEl.innerText = dataCeil;
        }
    }
});
// static counter number close

// sticky menus start
const nav = document.querySelector('header');

window.addEventListener('scroll', function(){
    if(this.document.documentElement.scrollTop > 20){
        nav.classList.add('sticky');
    } 
    else {
        nav.classList.remove('sticky');
    }
})
// sticky menus close

// parallax effect 
const Parallax = document.querySelector('#showcase');
window.addEventListener('scroll', function(){
    let offset = window.pageYOffset;
    Parallax.style.backgroundPositionY = offset * 0.7 + "px";
});
>>>>>>> 8bd70945388d0fbf4cf8a00beb88efc4f7a3a595
