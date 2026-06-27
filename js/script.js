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

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const STORAGE_KEY = 'atomax_active_slide';
  
  let currentSlide = 0;
  let autoPlayInterval;

  // Recupera o estado persistente
  const savedSlide = localStorage.getItem(STORAGE_KEY);
  if (savedSlide !== null && !isNaN(savedSlide)) {
    const index = parseInt(savedSlide, 10);
    if (index >= 0 && index < slides.length) {
      currentSlide = index;
    }
  }

  function updateCarousel(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Atualiza o estado
    localStorage.setItem(STORAGE_KEY, index);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel(currentSlide);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(nextSlide, 6000); // Roda a cada 6 segundos
  }

  // Event Listeners dos Botões
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Event Listeners dos Indicadores (Dots)
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      updateCarousel(currentSlide);
      resetAutoPlay();
    });
  });

  // Inicialização
  updateCarousel(currentSlide);
  resetAutoPlay();
});