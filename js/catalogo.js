document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('#eq-category-list li');
    const productCards = document.querySelectorAll('.eq-product-card');
    const tituloCategoria = document.getElementById('titulo-categoria');

    const whatsappPhone = '5547999985684';
    const cartStorageKey = 'atomaxCatalogCart';
    const cartToggle = document.querySelector('.eq-cart-toggle');
    const cartPanel = document.querySelector('.eq-cart-panel');
    const cartClose = document.querySelector('.eq-cart-close');
    const cartCount = document.querySelector('.eq-cart-count');
    const cartItemsList = document.querySelector('.eq-cart-items');
    const cartEmpty = document.querySelector('.eq-cart-empty');
    const cartTotalCount = document.querySelector('.eq-cart-total-count');
    const cartWhatsapp = document.querySelector('.eq-cart-whatsapp');
    const cartClear = document.querySelector('.eq-cart-clear');
    const addCartButtons = document.querySelectorAll('.btn-add-cart');
    let cart = loadCart();

    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();

                categoryItems.forEach(li => li.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');
                const categoryName = this.querySelector('.cat-left').textContent.trim();

                if (tituloCategoria) {
                    tituloCategoria.textContent = categoryName;
                }

                productCards.forEach(card => {
                    const shouldShow = filterValue === 'todos' || card.getAttribute('data-categoria') === filterValue;
                    card.style.display = shouldShow ? 'flex' : 'none';
                });
            });
        });
    }

    function loadCart() {
        try {
            return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
        } catch (error) {
            return [];
        }
    }

    function saveCart() {
        localStorage.setItem(cartStorageKey, JSON.stringify(cart));
    }

    function getCartTotal() {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    function openCart() {
        if (!cartPanel) return;
        cartPanel.classList.add('open');
        cartPanel.setAttribute('aria-hidden', 'false');
    }

    function closeCart() {
        if (!cartPanel) return;
        cartPanel.classList.remove('open');
        cartPanel.setAttribute('aria-hidden', 'true');
    }

    function normalizeId(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    function addToCart(product) {
        const item = cart.find(cartItem => cartItem.id === product.id);

        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        renderCart();
    }

    function changeQuantity(id, direction) {
        const item = cart.find(cartItem => cartItem.id === id);
        if (!item) return;

        item.quantity += direction;

        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.id !== id);
        }

        saveCart();
        renderCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        saveCart();
        renderCart();
    }

    function renderCart() {
        if (!cartItemsList || !cartCount || !cartTotalCount || !cartWhatsapp || !cartEmpty) return;

        const total = getCartTotal();
        cartCount.textContent = total;
        cartTotalCount.textContent = total;
        cartWhatsapp.disabled = cart.length === 0;
        cartClear.style.display = cart.length ? 'block' : 'none';
        cartEmpty.style.display = cart.length ? 'none' : 'block';

        cartItemsList.innerHTML = cart.map(item => `
            <div class="eq-cart-item" data-id="${item.id}">
                <div>
                    <div class="eq-cart-item-title">${item.name}</div>
                    <div class="eq-cart-item-category">${item.category}</div>
                </div>
                <div class="eq-cart-item-actions">
                    <div class="eq-cart-qty" aria-label="Quantidade">
                        <button type="button" data-action="decrease" aria-label="Diminuir quantidade">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button type="button" data-action="increase" aria-label="Aumentar quantidade">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="eq-cart-remove" type="button" data-action="remove">Remover</button>
                </div>
            </div>
        `).join('');
    }

    function buildWhatsappMessage() {
        const itemLines = cart
            .map((item, index) => `${index + 1}. ${item.quantity}x ${item.name} - ${item.category}`)
            .join('\n');

        return `Olá, gostaria de solicitar uma cotação para os equipamentos abaixo:\n\n${itemLines}\n`;
    }

    addCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.stopPropagation();

            const card = button.closest('.eq-product-card');
            const name = card?.querySelector('h4')?.textContent.trim();
            const category = card?.querySelector('.eq-tag')?.textContent.trim() || 'Equipamento';

            if (!name) return;

            addToCart({
                id: normalizeId(name),
                name,
                category
            });

            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fa-solid fa-check"></i> Adicionado';
            openCart();

            window.setTimeout(() => {
                button.innerHTML = originalText;
            }, 1200);
        });
    });

    cartToggle?.addEventListener('click', () => {
        if (!cartPanel) return;
        cartPanel.classList.contains('open') ? closeCart() : openCart();
    });

    cartClose?.addEventListener('click', closeCart);

    cartItemsList?.addEventListener('click', event => {
        const button = event.target.closest('button');
        if (!button) return;

        const itemElement = button.closest('.eq-cart-item');
        const id = itemElement?.dataset.id;
        const action = button.dataset.action;

        if (!id) return;

        if (action === 'increase') changeQuantity(id, 1);
        if (action === 'decrease') changeQuantity(id, -1);
        if (action === 'remove') removeFromCart(id);
    });

    cartClear?.addEventListener('click', () => {
        cart = [];
        saveCart();
        renderCart();
    });

    cartWhatsapp?.addEventListener('click', () => {
        if (!cart.length) return;

        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(buildWhatsappMessage())}`;
        window.open(whatsappUrl, '_blank');
    });

    document.addEventListener('click', event => {
        const clickedInsideCart = event.target.closest('.eq-cart-widget');
        const clickedAddButton = event.target.closest('.btn-add-cart');

        if (!clickedInsideCart && !clickedAddButton) {
            closeCart();
        }
    });

    renderCart();
});
