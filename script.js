// ==================== Navigation Menu Toggle ====================
let menus = document.querySelector('nav');
let menuBtn = document.querySelector('.menu-btn');
let closeBTN = document.querySelector('.close-btn');

menuBtn.addEventListener('click', () => menus.classList.add('active'));
closeBTN.addEventListener('click', () => menus.classList.remove('active'));

// Close menu when clicking on links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        menus.classList.remove('active');
    });
});

// ==================== Swiper JS ====================
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
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

// Updated menu data with correct image paths and varied titles
const menu = [
    { id: 1, title: "Chicken and Cashews", Catagory: "Dinner", price: 25, img: "./images/full.jpg" },
    { id: 2, title: "Grilled Fish", Catagory: "Lunch", price: 25, img: "./images/bar.jpg" },
    { id: 3, title: "Fresh Juice", Catagory: "Drinks", price: 25, img: "./images/seats.jpg" },
    { id: 4, title: "Spring Rolls", Catagory: "Starter", price: 25, img: "./images/seats2.jpg" },
    { id: 5, title: "Cocktail Special", Catagory: "Drinks", price: 25, img: "./images/seats3.jpg" },
    { id: 6, title: "Garlic Bread", Catagory: "Starter", price: 25, img: "./images/full.jpg" },
    { id: 7, title: "Beef Steak", Catagory: "Dinner", price: 25, img: "./images/bar.jpg" },
    { id: 8, title: "Caesar Salad", Catagory: "Lunch", price: 25, img: "./images/seats.jpg" },
    { id: 9, title: "Pasta Carbonara", Catagory: "Lunch", price: 25, img: "./images/seats2.jpg" }
];

// Load all menu items on page load
window.addEventListener('DOMContentLoaded', () => {
    displayMenuItems(menu);
    
    // Add active class to "All Dishes" button by default
    filterBtns.forEach(btn => {
        if (btn.dataset.id === 'all') {
            btn.classList.add('active_btn');
        }
    });
});

// Filter by category
filterBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active_btn'));
        // Add active class to clicked button
        e.currentTarget.classList.add('active_btn');
        
        const Catagory = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(item => item.Catagory === Catagory);
        displayMenuItems(Catagory === 'all' ? menu : menuCategory);
    });
});

function displayMenuItems(menuItems) {
    let displayMenu = menuItems.map(item => `
        <div class="img_cards">
            <img src="${item.img}" alt="${item.title}"/>
            <p class="price">Only $${item.price}</p>
            <p>${item.title}</p>
        </div>
    `).join("");
    SectionCenter.innerHTML = displayMenu;
}

// ==================== Animated Counter Numbers ====================
// Only run if counter elements exist on the page
const countersEl = document.querySelectorAll('.num');
if (countersEl.length > 0) {
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
}

// ==================== Sticky Header ====================
const nav = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
});

// ==================== Parallax Background ====================
// Only run if showcase element exists
const Parallax = document.getElementById('showcase');
if (Parallax) {
    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        Parallax.style.backgroundPositionY = offset * 0.7 + "px";
    });
}

// ==================== Form Submission ====================
const reservationForm = document.querySelector('#reservation_tbl form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Reservation submitted successfully! We will contact you soon.');
        reservationForm.reset();
    });
}

// ==================== Smooth Scrolling ====================
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Add CSS for Mobile Menu ====================
const style = document.createElement('style');
style.textContent = `
    nav .btn {
        display: none;
    }
    
    @media (max-width: 768px) {
        nav .btn {
            display: block;
            position: absolute;
            top: 20px;
            right: 20px;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1000;
        }
        
        nav {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            flex-direction: column;
            justify-content: center;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        nav.active {
            left: 0;
        }
        
        nav li {
            margin: 2rem 0;
        }
        
        nav li a {
            font-size: 2rem !important;
        }
        
        .menu-btn {
            display: block !important;
            position: fixed;
            top: 20px;
            right: 20px;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1000;
        }
    }
`;
document.head.appendChild(style);

console.log('Capanna Restaurant website loaded successfully! 🍕');
