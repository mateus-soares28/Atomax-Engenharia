document.addEventListener("DOMContentLoaded", async () => {
  // 1. Pega o ID da URL (ex: ?id=analisador-fluke-435-ii)
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get('id');

  if (!produtoId) {
    document.getElementById('detalhe-nome').textContent = "Equipamento não encontrado.";
    return;
  }

  try {
    // 2. Carrega o arquivo JSON
    const response = await fetch('./assets/data/equipamentos.json');
    const equipamentos = await response.json();

    // 3. Procura o equipamento correspondente no Array
    const produto = equipamentos.find(eq => eq.id === produtoId);

    if (produto) {
      // 4. Preenche os dados no HTML
      document.title = `${produto.nome} - Atomax`;
      document.getElementById('breadcrumb-nome').textContent = produto.nome;
      
      document.getElementById('detalhe-img').src = produto.imagem;
      document.getElementById('detalhe-img').alt = produto.nome;
      
      document.getElementById('detalhe-categoria').textContent = produto.categoria;
      document.getElementById('detalhe-nome').textContent = produto.nome;
      
      document.getElementById('detalhe-informacoes').textContent = produto.informacoes;
      document.getElementById('detalhe-especificacoes').textContent = produto.especificacoes;
      
      const btnManual = document.getElementById('detalhe-manual');
      if (produto.manual) {
        btnManual.href = produto.manual;
      } else {
        btnManual.style.display = 'none'; // Esconde o botão se não houver manual
      }

      // Adiciona o ID ao botão de carrinho para integração com seu script principal
      document.getElementById('detalhe-add-cart').setAttribute('data-id', produto.id);

    } else {
      // Caso o ID na URL não exista no JSON
      document.getElementById('detalhe-nome').textContent = "Equipamento não encontrado.";
    }
  } catch (error) {
    console.error("Erro ao carregar os dados do equipamento:", error);
    document.getElementById('detalhe-nome').textContent = "Erro ao carregar informações.";
  }
});