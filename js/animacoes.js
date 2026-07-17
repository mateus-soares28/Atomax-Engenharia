document.addEventListener("DOMContentLoaded", () => {
    // Registrar o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Selecionar todos os títulos e parágrafos
    const textElements = gsap
        .utils
        .toArray('h1, h2, h3, h4, h5, h6, p')
        .filter((el) => !el.closest('.product-carousel'));

    textElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%", // Anima quando o topo do elemento atinge 90% da janela
                toggleActions: "play none none none"
            },
            y: 30, // De baixo para cima
            opacity: 0, // Vindo de opacidade 0
            duration: 0.8, // Duração leve e suave
            ease: "power2.out"
        });
    });

    // Selecionar todos os cards (listando as classes de cards do projeto)
    const cardSelectors = [
        '.product-card',
        '.service-card-mini',
        '.service-card-detailed',
        '.feature-card',
        '.benefit-item',
        '.rental-feature',
        '.card',
        '.laudo-card'
    ].join(', ');

    const cards = gsap
        .utils
        .toArray(cardSelectors)
        .filter((card) => !card.closest('.product-carousel'));

    cards.forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });
});
