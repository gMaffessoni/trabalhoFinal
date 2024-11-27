console.log("Arquivo app.js carregado.");

async function iniciar() {
    listarProduto();
}

async function listarProduto() {
    var url = `./php/produto_listar.php`;
    var res = await fetch(url).then(resposta => resposta.json());

    var tabela = document.getElementById('tabelaProduto');
    var a = '';
    for (var i = 0; i < res.length; i++) {
        a += `<tr>
                <td>${res[i].idProduto}</td>
                <td>${res[i].nome}</td>
                <td>${res[i].preco}</td>
                <td>${res[i].categoria}</td>
                <td>${res[i].descricao}</td>
                <td><img src="${res[i].imagem}" width="50"/></td>
                <td>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalProduto" onclick="abrirProduto(${res[i].idProduto})">Alterar</button>
                    <button class="btn btn-danger" onclick="excluirProduto(${res[i].idProduto})">Excluir</button>
                </td>
              </tr>`;
    }
    tabela.innerHTML = a;
}

async function buscarProduto() {
    var nomeProduto = document.getElementById('produtoNome').value.toLowerCase();
    
    var categorias = {
        "jóias": "jewelery",
        "eletrônicos": "electronics",
        "masculino": "men's clothing",
        "feminino": "women's clothing"
    };

    var categoriaIngles = categorias[nomeProduto];
    if (!categoriaIngles) {
        alert("Categoria não encontrada. Tente 'jóias', 'eletrônicos', 'masculino' ou 'feminino'.");
        return;
    }

    var url = `https://fakestoreapi.com/products/category/${categoriaIngles}`;
    var res = await fetch(url).then(resposta => resposta.json());

    for (var i = 0; i < res.length; i++) {
        var produto = {
            nome: res[i].title,
            preco: res[i].price,
            categoria: res[i].category,
            descricao: res[i].description,
            imagem: res[i].image
        };

        await salvarProdutoAPI(produto);
    }

    document.getElementById('produtoNome').value = '';

    await registrarLog(res.length);

    listarProduto();
}

async function salvarProdutoAPI(produto) {
    var url = `./php/produto_inserir.php?nome=${produto.nome}&preco=${produto.preco}&categoria=${produto.categoria}&descricao=${produto.descricao}&imagem=${produto.imagem}`;
    
    await fetch(url);
}

async function salvarProduto() {
    var inputIdProduto = document.getElementById('idProduto').value;
    var inputNome = document.getElementById('nome').value;
    var inputPreco = document.getElementById('preco').value;
    var inputCategoria = document.getElementById('categoria').value;
    var inputDescricao = document.getElementById('descricao').value;
    var inputImagem = document.getElementById('imagem').value;
    var url = '';

    if (inputIdProduto === '') {
        url = `./php/produto_inserir.php?nome=${inputNome}&preco=${inputPreco}&categoria=${inputCategoria}&descricao=${inputDescricao}&imagem=${inputImagem}`;
    } else {
        url = `./php/produto_alterar.php?idProduto=${inputIdProduto}&nome=${inputNome}&preco=${inputPreco}&categoria=${inputCategoria}&descricao=${inputDescricao}&imagem=${inputImagem}`;
    }

    await fetch(url);

    listarProduto();
}

async function abrirProduto(idProduto) {
    var url = `./php/produto_listar.php`;
    var res = await fetch(url).then(resposta => resposta.json());

    var produto = res.find(p => p.idProduto === idProduto);
    document.getElementById('idProduto').value = produto.idProduto;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('imagem').value = produto.imagem;
}

async function excluirProduto(idProduto) {
    var url = `./php/produto_excluir.php?idProduto=${idProduto}`;
    await fetch(url);

    listarProduto();
}

async function limparDados() {
    var url = `./php/produto_limpar.php`;
    var response = await fetch(url).then(resposta => resposta.json());
    console.log(response);
    
    listarProduto();
}

async function registrarLog(quantidade) {
    var url = `./php/log_registrar.php?quantidade=${quantidade}`;
    await fetch(url);
}

async function listarLogs() {
    console.log("Função listarLogs chamada.");
    var url = `./php/log_listar.php`;
    var res = await fetch(url).then(resposta => resposta.json());

    var tabela = document.getElementById('tabelaLogs');
    var a = '';
    for (var i = 0; i < res.length; i++) {
        a += `<tr>
                <td>${res[i].idlog}</td>
                <td>${res[i].datahora}</td>
                <td>${res[i].numeroregistros}</td>
              </tr>`;
    }
    tabela.innerHTML = a;
}
