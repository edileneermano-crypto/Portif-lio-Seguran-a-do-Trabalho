document.addEventListener("DOMContentLoaded", function () {
  // --- PARTE DO BONECO (Agora dentro do carregamento seguro) ---
  const boneco = document.getElementById("boneco");
  if (boneco) {
    // Só executa se o boneco realmente existir no HTML
    boneco.style.transform = "translateY(-40px)";
  }

  // PARTE ENVIAR MENSAGEM COM AVISO DE ENVIADO SUCESSO

  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function () {
    setTimeout(() => {
      form.style.display = "none";
      successMessage.style.display = "block";
    }, 500);
  });

  // --- PARTE DO CARROSSEL ---
  const track = document.querySelector('[data-carousel-track="certificacoes"]');
  const nextBtn = document.querySelector(
    '.next-arrow[data-carousel="certificacoes"]'
  );
  const prevBtn = document.querySelector(
    '.prev-arrow[data-carousel="certificacoes"]'
  );

  // Seleciona todos os itens UMA VEZ para verificar se existem
  const items = document.querySelectorAll(".cert-item");

  // Se o trilho ou os botões não existirem, o código para aqui sem dar erro no console
  if (!track || !nextBtn || !prevBtn || items.length === 0) {
    console.warn("Elementos do carrossel não encontrados ou lista vazia.");
    return;
  }

  let index = 0;

  function moveCarousel() {
    // Recalcula a largura sempre que move (importante para responsividade)
    const itemWidth = items[0].offsetWidth + 20;
    track.style.transform = `translateX(${-index * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    const visibleItems = getVisibleItemsCount();
    // Garante que o limite de cliques respeite a quantidade de itens
    const maxIndex = Math.max(0, items.length - visibleItems);

    if (index < maxIndex) {
      index++;
    } else {
      index = 0; // Volta ao início
    }
    moveCarousel();
  });

  prevBtn.addEventListener("click", () => {
    const visibleItems = getVisibleItemsCount();
    const maxIndex = Math.max(0, items.length - visibleItems);

    if (index > 0) {
      index--;
    } else {
      index = maxIndex; // Vai para o final
    }
    moveCarousel();
  });

  function getVisibleItemsCount() {
    if (window.innerWidth >= 900) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  window.addEventListener("resize", () => {
    index = 0;
    moveCarousel();
  });
});
