// Ao campo CEP perder o foco será feita a tratativa 
document.getElementById("cep").addEventListener("blur", async function () {
    const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos 

    // Verifica se o CEP tem exatamente 8 dígitos
    if (cep.length !== 8) {
        alert("CEP inválido, deve ter 8 dígitos."); // Alerta se for inválido
        return; // Não executa o código abaixo
    }

    try {
        // Faz uma requisição para o backend e consulta o CEP informado
        const response = await fetch(`http://localhost:3000/api/cep/${cep}`);

        if (!response.ok) { // Verifica se a resposta foi bem-sucedida 
            throw new Error('Erro ao buscar o CEP'); // Lança um erro em caso de falha 
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Verifica se o CEP retornado pela API é inválido
        if (data.erro) {
            alert('CEP não encontrado!');
            return;
        }

        // Preenche os campos do formulário com os dados retornados 
        document.getElementById('logradouro').value = data.logradouro;
        document.getElementById('bairro').value = data.bairro;
        document.getElementById('cidade').value = data.cidade;
        document.getElementById('estado').value = data.uf;

        // Adiciona um feedback visual, alterando a cor da borda dos campos 
        document.querySelectorAll('.form-group input').forEach(input => {
            input.style.borderColor = "#6a11cb"; // Borda roxa se o CEP for encontrado
        });

    } catch (error) {
        console.error("Erro ao buscar CEP:", error); // Exibe o erro no console 
        alert("Erro ao buscar o CEP. Verifique o console para mais detalhes.");
    }
});
