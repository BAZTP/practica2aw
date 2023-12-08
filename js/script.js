// Autor: Danny Alexander Jácome López

// Arreglos de objetos
// Arreglo de objetos para el menu
let sections = [{
    title: 'Home',
    url: 'index.html'
}, {
    name: 'section1',
    title: 'Suscripciones y juegos',
    url: 'section1.html'
}, {
    title: 'Accesorios',
    url: 'section2.html'
}, {
    title: 'Sección de Pagos',
    url: 'section3.html'
}, {
    title: 'Sobre nosotros',
    url: 'section4.html'
}, {
    title: 'Promociones',
    url: 'section5.html'
}, {
    title: 'Tu carrito',
    url: 'section6.html'
}]

// Arreglo de objetos para los productos
let products = [{
    name: 'PlayStation 4',
    price: 300,
    description: 'Console'
}, {
    name: 'PlayStation 4 Pro',
    price: 400,
    description: 'Console'
}, {
    name: 'PlayStation 5',
    price: 500,
    description: 'Console'

}, {
    name: 'PlayStation 5 Pro',
    price: 600,
    description: 'Console'
}]

// Arreglo de objetos para los descuentos
let discounts = [{
    key: 'discount1',
    price: 5,
    description: 'Discount 1'
}, {
    key: 'discount2',
    price: 10,
    description: 'Discount 2'
}, {
    key: 'discount3',
    price: 15,
    description: 'Discount 3'
}, {
    key: 'discount4',
    price: 20,
    description: 'Discount 4'
}, {
    key: 'AllFree',
    price: 999999999,
    description: 'Redeem all products for free'
}]

//Iniciador de JQuery
$(document).ready(function () {
    /*Función para cargar el menu*/
    loadMenu($('#menu'));
    $('#menu').menu();

    /*Función para cargar el menu mobile*/
    loadMenu($('#mobile-menu'));
    $('#mobile-menu').menu();
    
    loadMenu($('#servicios-footer-lista'));

    /*Función para cargar los productos*/
    loadProducts($('#products'));

    /*Función para el menu mobile*/
    $("#menu-toggle").on('click', () => {
        $("#menu-mobile-container").slideToggle();
    })

    /*Función para Poner el precio Total*/
    countTotal();

    /*Función para redireccionar a la sección 6*/
    $('#redirButton').on('click', function(event) {
        window.location.href = 'section6.html';
    });

    /*Función para agregar un descuento*/
    $('#submitCode').on('click', function(event) {
        event.preventDefault();
        console.log('Redeem button clicked');
        addDiscount();
    });

    /*Función para validar los formularios*/
    const forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    console.log('Document ready');
});


//Funciones
/*Función para cargar el menu*/
const loadMenu = (menuContainer) => {
    const menu = sections.map(section => `
        <li>
            <a href="${section.url}">${section.title}</a>
        </li>
    `).join('');
    menuContainer.html(menu);
}

/*Función para cargar los productos*/
/*Funciona al momento de cargar la página, carga los productos*/
const loadProducts = (productsContainer) => {
    const productsList = products.map(product => `
        <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
                <h6 class="my-0">${product.name}</h6>
                <small class="text-body-secondary">${product.description}</small>
            </div>
            <span class="text-body-secondary">$${product.price}</span>
        </li>
    `).join('');
    productsContainer.prepend(productsList);
}

/*Función para contar el total de productos*/
/*Funciona al momento de cargar la página, cuenta los productos y suma sus precios*/
const countTotal = () => {
    let total = 0;
    products.forEach(product => {
        total += product.price;
    });
    total -= $('#discount').val();
    $('#total').html(total);
    $('#count').html(products.length);
}

/*Función para agregar un descuento*/
/*Funciona al momento de dar click en el botón, inserta un descuento y recarga el total*/
const addDiscount = () => {
    const discount = $('#discountImput').val();
    const discountObject = discounts.find(d => d.key === discount);
    if (discountObject) {
        $('#discount').val(discountObject.price);
        $('#discount').html(`
        <div class="text-success">
            <h6 class="my-0">Promo code</h6>
            <small>${discountObject.description}</small>
        </div>
        <span class="text-success">-$${discountObject.price}</span>
        `);
        countTotal();
    }
}