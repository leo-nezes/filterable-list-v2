const filterInput = document.getElementById('filterInput');
const ul = document.getElementById('names');
const letters = [];
var names;

// FUNÇÕES PRINCIPAIS
//Busca dados no JSON
function buscarNomes() {
    const names = buscarDadosNoJSON();

    names.then((response) => {
        let nomesNoJSON = response;
        
        if(nomesNoJSON.length !== 0){
            separaLetras(nomesNoJSON);
            inputHtml(letters, nomesNoJSON);
        }else{
            console.info("JSON sem dados para serem mostrados");
            return;
        }
    })
}

// Filtra lista de contatos
async function filtrarNomes(){
    let valorInput = filterInput.value.charAt(0).toUpperCase() + filterInput.value.toLowerCase().substring(1);
    let nomes = buscarDadosNoJSON();
    
    nomes.then((nomeDoJSON) => {
        let resultados = nomeDoJSON.filter(nome => {
            let regex = new RegExp(`${valorInput}`, 'gi');
            return nome.name.match(regex);
        });

        if(resultados.length > 0)
        mostrarResultados(resultados)
        });
    };

// FUNÇÕES AUXILIARES
//Insere os dados no HTML
const inputHtml = (lettersInput, namesInput) => {
    if(lettersInput.length > 0 && namesInput.length > 0){
        lettersInput.forEach(letra =>{
            let li = document.createElement('li');
            let h5 = document.createElement('h5');

            ul.append(li);
            li.classList.add('collection-header');
            li.append(h5);
            h5.innerHTML = `${letra}`;
            
            //Ordenando por nomes
            namesInput.sort( ( a, b ) => {
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            });
            
            namesInput.filter(objeto => {
                if(objeto.letter === letra){
                    let liNameItem = document.createElement('li');
                    let aNameItem = document.createElement('a');

                    ul.append(liNameItem);
                    liNameItem.classList.add('collection-item');
                    liNameItem.append(aNameItem);
                    aNameItem.href = '#';
                    aNameItem.innerHTML = `${objeto.name}`;
                }
            })
        });
    }
}

//Separa dados do arquivo JSON
const separaLetras = nomes => {
    nomes.forEach(nome => {
        
        if(!letters.includes(nome.letter))
            letters.push(nome.letter);
    });
}

//Filtra dados
const filtraDados = (cabecalhos, nomesJson) => {

    nomes.forEach(nome => {
        
        if(!letters.includes(nome.letter))
            letters.push(nome.letter);
    });
}

//Busca dados no JSON
async function buscarDadosNoJSON() {
    const response = await fetch('./data/data.json')
        .then((response) => {
            console.info("Iniciando busca no arquivo JSON.");
            return response;
        })
        .then((responseJson) => {
            console.info("Arquivo JSON encontrado.");
            return responseJson.json();
        })
        .catch((error) => {
            console.error("Erro ao encontrar o arquivo JSON. Mensagem: " + error);
        });

    return response;
}

// Mostrar resultados no HTML
function mostrarResultados(nomesFiltrados){
    ul.innerHTML = [];
    letters.forEach(letra =>{
        let li = document.createElement('li');
        let h5 = document.createElement('h5');
        
        ul.append(li);
        li.classList.add('collection-header');
        li.append(h5);
        h5.innerHTML = `${letra}`;
        
        nomesFiltrados.forEach((nomeFiltrado) => {
            if(letra === nomeFiltrado.letter){
                let liItem = document.createElement('li');
                let aItem = document.createElement('a');
                ul.append(liItem);
                liItem.classList.add('collection-item');
                liItem.append(aItem);
                aItem.href = '#';
                aItem.innerHTML = `${nomeFiltrado.name}`;
            }
        });
    });
}

addEventListener("DOMContentLoaded", buscarNomes());
filterInput.addEventListener("keyup", filtrarNomes);