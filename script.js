const apiKey = '95aed29bd48148029d41a9e40e185ac3'; // Substitua pela sua chave de API
let correctGame;
let options = [];
//------------------------------------------------------------------------------------
function adivinharGames() {
    fetch(`https://api.rawg.io/api/games?key=${apiKey}&page_size=30`)
    .then(response => response.json())
    .then(data => {
    // Seleciona um jogo aleatório como correto
    const idAleatorio = Math.floor(Math.random() * data.results.length);
    correctGame = data.results[idAleatorio];
    
    // Inicializa as opções de resposta com o jogo correto
    options = [correctGame];
    
    // Adiciona mais 3 opções aleatórias (diferentes do jogo correto)
    while (options.length < 4) {
    const randomOption = data.results[Math.floor(Math.random() *
    data.results.length)];
    if (!options.includes(randomOption)) {
    options.push(randomOption);
    }
    }
    
    // Embaralha as opções
    options.sort(() => Math.random() - 0.5);
    pergunta();
    })
    .catch(error => console.error('Erro:', error));
    }
    //----------------------------------------------------------------------------------
    function pergunta() {
        // Exibe a pergunta e a imagem do jogo
        document.getElementById('pergunta').innerHTML = '<p>Qual é o jogo?</p>';
        document.getElementById('jogo_img').src = correctGame.background_image;
        document.getElementById('jogo_img').style.display = 'block';
        
        // Limpa as opções anteriores
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        
        // Cria botões para as opções
        options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add("opcoes") //modificar botoes
        button.innerText = option.name;
        button.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(button);
        });
        }
        //------------------------------------------------------------------------------------
        function checkAnswer(selected) {
            const resultDiv = document.getElementById('result');
            
            if (selected.id === correctGame.id) {
            resultDiv.innerText = "<p>Correto!</p>";
            } else {
            resultDiv.innerHTML = `<p>Incorreto! O jogo era: ${correctGame.name}</p>`;
            }
            
            // Exibe o botão para jogar novamente
            document.getElementById('proximo_jogo').style.display = 'block';
            }
            //-------------------------------------------------------------------------------------------
            document.getElementById('proximo_jogo').onclick = () => {
                // Limpa o resultado e esconde o botão
                document.getElementById('result').innerHTML = '';
                document.getElementById('proximo_jogo').style.display = 'none';
                
                // Inicia um novo jogo
                adivinharGames();
                };
                // Iniciar o jogo automaticamente 
                adivinharGames();