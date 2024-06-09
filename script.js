function startQuiz() {
    console.log('Iniciando o quiz...');
    document.querySelector('.content').style.display = 'none';
    document.getElementById('quizForm').style.display = 'block';
    document.getElementById('quizForm').classList.add('show'); // Adicionando a classe 'show' para exibir as perguntas
    updateProgressBar(); // Adicionando esta linha para atualizar a barra de progresso no início do quiz
}


function previousQuestion(currentQuestion) {
    if (currentQuestion === 1) {
        // Se estivermos na primeira pergunta, não fazemos nada
        return;
    }

    const current = document.getElementById(`question${currentQuestion}`);
    const previous = document.getElementById(`question${currentQuestion - 1}`);
    
    current.style.display = 'none';
    previous.style.display = 'block';
    updateProgressBar(); // Atualiza a barra de progresso ao voltar para a pergunta anterior
    
    const backButton = document.querySelector('.back-button');
    if (currentQuestion - 1 === 1) {
        // Se voltarmos para a primeira pergunta, ocultamos o botão de voltar
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'inline-block';
    }
}

function displayErrorMessage(message, questionNumber) {
    const errorMessageDiv = document.getElementById(`error-message${questionNumber}`);
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.color = 'red';
}

function nextQuestion(currentQuestion) {
    const current = document.getElementById(`question${currentQuestion}`);
    const next = document.getElementById(`question${currentQuestion + 1}`);

    if (document.querySelector(`input[name="q${currentQuestion}"]:checked`)) {
        current.style.display = 'none';
        if (next) {
            next.style.display = 'block';
        } else {
            calculateResult(); // Chama calculateResult() quando todas as perguntas forem respondidas
            updateProgressBar(); // Atualiza a barra de progresso após calcular o resultado final
        }
        updateProgressBar(); // Atualiza a barra de progresso após exibir a próxima pergunta
    } else {
        displayErrorMessage("Selecione uma opção para prosseguir.", currentQuestion);
    }
}

function calculateResult() {
    const form = document.getElementById('quizForm');
    const q1 = form.querySelector('[name="q1"]:checked').value;
    const q2 = form.querySelector('[name="q2"]:checked').value;
    const q3 = form.querySelector('[name="q3"]:checked').value;
    const q4 = form.querySelector('[name="q4"]:checked').value;
    const q5 = form.querySelector('[name="q5"]:checked').value;

    let profile;

    if (q4 === "Curto prazo" && q5 === "Conservador") {
        profile = "Conservador de Curto Prazo";
    } else if (q4 === "Médio prazo" && q5 === "Conservador") {
        profile = "Conservador de Médio Prazo";
    } else if (q4 === "Longo prazo" && q5 === "Conservador") {
        profile = "Conservador de Longo Prazo";
    } else if (q4 === "Curto prazo" && q5 === "Moderado") {
        profile = "Moderado de Curto Prazo";
    } else if (q4 === "Médio prazo" && q5 === "Moderado") {
        profile = "Moderado de Médio Prazo";
    } else if (q4 === "Longo prazo" && q5 === "Moderado") {
        profile = "Moderado de Longo Prazo";
    } else if (q4 === "Curto prazo" && q5 === "Agressivo") {
        profile = "Agressivo de Curto Prazo";
    } else if (q4 === "Médio prazo" && q5 === "Agressivo") {
        profile = "Agressivo de Médio Prazo";
    } else if (q4 === "Longo prazo" && q5 === "Agressivo") {
        profile = "Agressivo de Longo Prazo";
    } else {
        profile = "Perfil não identificado. Por favor, revise suas respostas.";
    }

    let knowledgeDescription;
    if (q1 === "Iniciante") {
        knowledgeDescription = "Iniciante no ramo de investimentos";
    } else if (q1 === "Intermediário") {
        knowledgeDescription = "Com alguma experiência em investimentos";
    } else if (q1 === "Avançado") {
        knowledgeDescription = "Investidor experiente";
    }

    let riskDescription;
    if (q5 === "Conservador") {
        riskDescription = "sem arriscar seu dinheiro";
    } else if (q5 === "Moderado") {
        riskDescription = "e preferindo produtos nem tão conservadores nem tão ousados";
    } else if (q5 === "Agressivo") {
        riskDescription = "e optando por produtos mais ousados";
    }

    const description = `${knowledgeDescription}, visando investir capital para a ${q3.toLowerCase()} em ${q4.toLowerCase()} ${riskDescription}, achamos que esses investimentos combinam com você:`;

    let recommendations;

    if (profile === "Conservador de Curto Prazo") {
        recommendations = `
            <ul>
                <li>CDBs de curto prazo - Certificados de Depósito Bancário que oferecem maior segurança e liquidez.</li>
                <li>Fundos DI - Fundos de investimento que seguem a taxa Selic, oferecendo baixo risco.</li>
                <li>Títulos do Tesouro Direto com liquidez diária (Tesouro Selic) - Títulos públicos seguros e com resgate a qualquer momento.</li>
            </ul>
        `;
    } else if (profile === "Conservador de Médio Prazo") {
        recommendations = `
            <ul>
                <li>Fundos de renda fixa de médio prazo - Investimentos que proporcionam estabilidade com prazos mais longos.</li>
                <li>LCIs e LCAs - Letras de Crédito Imobiliário e do Agronegócio que são isentas de IR.</li>
                <li>Títulos do Tesouro com vencimento em 3-7 anos (Tesouro IPCA+) - Títulos que protegem contra a inflação.</li>
            </ul>
        `;
    } else if (profile === "Conservador de Longo Prazo") {
        recommendations = `
            <ul>
                <li>Fundos de renda fixa de longo prazo - Para investidores que buscam segurança ao longo dos anos.</li>
                <li>Poupança programada - Opção tradicional e segura para longo prazo.</li>
                <li>Títulos do Tesouro com vencimento acima de 7 anos (Tesouro IPCA+ 2035) - Proteção contra inflação e segurança a longo prazo.</li>
            </ul>
        `;
    } else if (profile === "Moderado de Curto Prazo") {
        recommendations = `
            <ul>
                <li>Fundos multimercado - Diversificação com um pouco mais de risco.</li>
                <li>Debêntures - Títulos de crédito de empresas com prazo curto e rentabilidade atrativa.</li>
                <li>ETFs de renda fixa - Fundos que acompanham índices de renda fixa com maior liquidez.</li>
            </ul>
        `;
    } else if (profile === "Moderado de Médio Prazo") {
        recommendations = `
            <ul>
                <li>Fundos balanceados - Mistura de renda fixa e variável para médio prazo.</li>
                <li>Debêntures de médio prazo - Rendimento acima da inflação com risco controlado.</li>
                <li>ETFs de ações - Diversificação em ações com gestão passiva.</li>
            </ul>
        `;
    } else if (profile === "Moderado de Longo Prazo") {
        recommendations = `
            <ul>
                <li>Fundos de ações - Investimento em empresas com potencial de crescimento a longo prazo.</li>
                <li>Debêntures de longo prazo - Para quem busca rentabilidade acima da média com prazo estendido.</li>
                <li>ETFs de ações internacionais - Diversificação global com foco no longo prazo.</li>
            </ul>
        `;
    } else if (profile === "Agressivo de Curto Prazo") {
        recommendations = `
            <ul>
                <li>Day Trade - Operações de compra e venda no mesmo dia, alta volatilidade e risco.</li>
                <li>Opções - Derivativos que podem potencializar ganhos ou perdas.</li>
                <li>Criptomoedas - Ativos digitais de alta volatilidade e possibilidade de altos retornos.</li>
            </ul>
        `;
    } else if (profile === "Agressivo de Médio Prazo") {
        recommendations = `
            <ul>
                <li>Fundos de ações de alto crescimento - Empresas com potencial de crescimento acelerado.</li>
                <li>Criptomoedas com perspectiva de valorização - Investimentos com alto potencial de retorno.</li>
                <li>Fundos imobiliários de desenvolvimento - Foco em projetos imobiliários com maior risco.</li>
            </ul>
        `;
    } else if (profile === "Agressivo de Longo Prazo") {
        recommendations = `
            <ul>
                <li>Private equity
                - Participação em empresas com alto potencial de valorização.</li>
                <li>Criptomoedas com hold a longo prazo - Estratégia de manutenção de ativos digitais.</li>
                <li>Investimentos alternativos - Startups, venture capital, e outros investimentos de alto risco.</li>
            </ul>
        `;
    } else {
        recommendations = "Por favor, revise suas respostas.";
    }

    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h2>${profile}</h2>
            <p>${description}</p>
            ${recommendations}
        `;

        document.getElementById('quizForm').style.display = 'none';
        resultDiv.style.display = 'block';

        // Adiciona a classe de transição
        resultDiv.classList.add('transition');

        // Aguarda um pequeno intervalo antes de adicionar a classe 'show'
        setTimeout(() => {
            // Adiciona a classe 'show' após um pequeno intervalo
            resultDiv.classList.add('show');
        }, 100); // Ajuste este valor conforme necessário
    } else {
        console.error("Elemento com id 'result' não encontrado!");
    }
}

function updateProgressBar() {
    const totalQuestions = 5;
    const answeredQuestions = document.querySelectorAll('.question input[type="radio"]:checked').length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

// Verifica se a página atual é a página inicial
document.addEventListener("DOMContentLoaded", function() {
    var homeLink = document.querySelector(".inicio");
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        homeLink.style.color = "#4692c5";
        homeLink.addEventListener("click", function(event) {
            if (!homeLink.hasAttribute("data-link")) {
                event.preventDefault(); // Impede o redirecionamento
            }
        });
    } else {
        homeLink.style.color = "#fff";
    }
});


