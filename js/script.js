document.addEventListener('DOMContentLoaded', () => {
    // Efeito sutil ao scrollar a página (Opcional, para deixar o Header Fixo no futuro)
    const header = document.querySelector('.header, .site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Animação de hover adicional nos botões 'Saiba Mais'
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.fa-circle-chevron-right');
            if (!icon) return;
            icon.style.transform = 'translateX(5px)';
            icon.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.fa-circle-chevron-right');
            if (!icon) return;
            icon.style.transform = 'translateX(0)';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Código anterior de navegação e scroll aqui...

    // --- Lógica do Accordion (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const answer = parentItem.querySelector('.faq-answer');
            const icon = question.querySelector('i');

            // Verifica se o item clicado já está aberto
            const isActive = parentItem.classList.contains('active');

            // 1. Fecha todos os outros itens primeiro (Acordeão exclusivo)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemAnswer = item.querySelector('.faq-answer');
                const itemIcon = item.querySelector('.faq-question i');
                if (itemAnswer) itemAnswer.style.display = 'none';
                if (itemIcon) itemIcon.classList.replace('fa-minus', 'fa-plus');
            });

            // 2. Se não estava ativo, abre o item clicado
            if (!isActive) {
                parentItem.classList.add('active');
                answer.style.display = 'block';
                icon.classList.replace('fa-plus', 'fa-minus');
            }
        });
    });
});
