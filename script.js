const selectElement = document.getElementById('select');
const mensagem = document.getElementById('mensagem');
const button = document.getElementById('submit'); 
const titulo = document.getElementById('titulo');
const describe = document.getElementById('describe');
const information = document.getElementById('informations')
const stars = document.getElementById('stars');
const forks = document.getElementById('forks');
const visual = document.getElementById('visual');

const linguagens = [
    { value: '', label: 'Selecione uma linguagem' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'Ruby', label: 'Ruby' },
    { value: 'C#', label: 'C#' },
    { value: 'PHP', label: 'PHP' },
    { value: 'C++', label: 'C++' },
    { value: 'Node', label: 'Node' },
];

linguagens.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.value;
    option.textContent = lang.label;
    selectElement.appendChild(option);
});

mensagem.textContent = 'Por favor, selecione uma linguagem.';

let repositorios = [];


selectElement.addEventListener('change', () => {
    if (!selectElement.value) {
        mensagem.textContent = 'Selecione uma linguagem.';
        button.classList.remove('active');
        button.textContent = 'Buscar';
        mensagem.classList.remove('error');
        mensagem.classList.remove('info');
        describe.classList.remove('ac');
        information.classList.remove('ativado');
        titulo.textContent='';
        return;
    } else {
        buscar();
    }
});

const buscar = async () => {
    button.classList.remove('retry');
    mensagem.classList.remove('info');
    button.classList.add('active');
    button.textContent = 'Pesquisar Outro';
    mensagem.classList.remove('error');
    mensagem.classList.add('loading');
    mensagem.textContent = 'Carregando...';
    button.classList.add('loading');
    const language = selectElement.value;
    mensagem.classList.remove('error');
    try {
        const resp = await fetch(
            `https://api.github.com/search/repositories?q=language:${language}`
        );
        const data = await resp.json();
        repositorios = data.items; 
        Repositorio();
    } catch (error) {
        mensagem.classList.add('error');
        mensagem.classList.remove("loading");
        mensagem.classList.remove("info");
        button.textContent = 'Tentar denovo';
        button.classList.add('retry');
        mensagem.textContent = 'Erro ao buscar repositórios. Tente novamente.';
    }
};

const Repositorio = () => {
    if (repositorios.length > 0) {
        mensagem.classList.add('info');
        const indiceAleatorio = Math.floor(Math.random() * repositorios.length);
        const repo = repositorios[indiceAleatorio];
        describe.classList.add('ac');
        information.classList.add('ativado');
        forks.textContent = ' ' + repo.forks;
        visual.textContent = ' ' + repo.watchers;
        stars.textContent = ' ' + repo.stargazers_count;
        describe.addEventListener('click', () => {
            window.open(repositorios[indiceAleatorio].clone_url, '_blank');
        });
        mensagem.textContent = repo.description || 'Sem descrição';
        titulo.textContent = repo.name || 'Sem titulo';
    } else {
        mensagem.classList.remove('loading');
        mensagem.classList.remove('info');
        mensagem.classList.add('error');
        mensagem.textContent = 'Nenhum repositório encontrado.';
        button.textContent = 'Click to Retry';
        button.classList.add('Tentar denovo');
    }
};

button.addEventListener('click',buscar);



