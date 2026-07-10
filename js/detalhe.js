document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get("id");
  const cartStorageKey = "atomaxCatalogCart";
  const openCartStorageKey = "atomaxOpenCart";

  if (!produtoId) {
    document.getElementById("detalhe-nome").textContent = "Equipamento nao encontrado.";
    return;
  }

  try {
    const [response, manuaisResponse] = await Promise.all([
      fetch("./assets/data/equipamentos.json"),
      fetch("./assets/data/manuais-produtos.json")
    ]);
    const equipamentos = await response.json();
    const manuaisPorProduto = manuaisResponse.ok ? await manuaisResponse.json() : {};
    const produto = equipamentos.find(eq => eq.id === produtoId);

    if (produto) {
      document.title = `${produto.nome} - Atomax`;
      document.getElementById("breadcrumb-nome").textContent = produto.nome;

      document.getElementById("detalhe-img").src = produto.imagem;
      document.getElementById("detalhe-img").alt = produto.nome;

      document.getElementById("detalhe-categoria").textContent = produto.categoria;
      document.getElementById("detalhe-nome").textContent = produto.nome;

      document.getElementById("detalhe-informacoes").textContent = produto.informacoes;
      document.getElementById("detalhe-especificacoes").textContent = produto.especificacoes;

      renderManuais(manuaisPorProduto[produto.id] || getLegacyManual(produto));

      const addCartButton = document.getElementById("detalhe-add-cart");
      addCartButton.setAttribute("data-id", produto.id);
      addCartButton.addEventListener("click", () => {
        addToCart({
          id: produto.id,
          name: produto.nome,
          category: produto.categoria
        });

        localStorage.setItem(openCartStorageKey, "1");
        window.location.href = "./equipamentos.html";
      });
    } else {
      document.getElementById("detalhe-nome").textContent = "Equipamento nao encontrado.";
    }
  } catch (error) {
    console.error("Erro ao carregar os dados do equipamento:", error);
    document.getElementById("detalhe-nome").textContent = "Erro ao carregar informacoes.";
  }

  function getLegacyManual(produto) {
    if (!produto.manual || produto.manual === "#") return [];

    return [{
      titulo: "Baixar manual",
      url: produto.manual
    }];
  }

  function renderManuais(manuais) {
    const manuaisContainer = document.getElementById("detalhe-manuais");

    if (!manuaisContainer) return;

    if (!manuais.length) {
      manuaisContainer.innerHTML = '<p class="manuals-empty">Nenhum manual cadastrado para este equipamento.</p>';
      return;
    }

    manuaisContainer.innerHTML = manuais.map(manual => `
      <a href="${manual.url}" target="_blank" rel="noopener" class="btn-manual">
        <i class="fa-solid ${getManualIcon(manual.url)}"></i>
        <span>${manual.titulo}</span>
      </a>
    `).join("");
  }

  function getManualIcon(url) {
    if (/youtube\.com|youtu\.be/.test(url)) return "fa-circle-play";
    if (/\.docx?$/i.test(url)) return "fa-file-word";
    return "fa-file-pdf";
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(cartStorageKey)) || [];
    } catch (error) {
      return [];
    }
  }

  function addToCart(product) {
    const cart = loadCart();
    const item = cart.find(cartItem => cartItem.id === product.id);

    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  }
});
