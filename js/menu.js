document.addEventListener('DOMContentLoaded', () => {
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header-container');

    if (!mobileMenuBtn && nav && headerContainer) {
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.type = 'button';
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        headerContainer.appendChild(mobileMenuBtn);
    }

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            header?.classList.toggle('menu-open');
            document.body.classList.toggle('menu-open', nav.classList.contains('active'));
            mobileMenuBtn.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
                mobileMenuBtn.setAttribute('aria-label', 'Fechar menu');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');
            }
        });

        function closeMenu() {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            header?.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Abrir menu');

            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }

        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', event => {
            const clickedMenu = event.target.closest('.nav');
            const clickedButton = event.target.closest('.mobile-menu-btn');

            if (nav.classList.contains('active') && !clickedMenu && !clickedButton) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});
