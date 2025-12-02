const urlBase = "http://159.65.228.63/";
let tarefas = [];

async function atualizar() {
    try {
        const response = await fetch(urlBase + "tarefas");
        if (!response.ok) throw new Error("Network response was not ok");
        tarefas = await response.json();
    } catch (err) {
        console.error("Erro ao buscar tarefas:", err);
        tarefas = [];
    }
    mostrarTabela();
}

function mostrarTabela() {
    const container = document.getElementById("conteudo");
    if (!container) return;

    container.innerHTML = "";

    if (!tarefas || tarefas.length === 0) {
        container.innerHTML = "<h3>nenhuma tarefa cadastrada</h3>";
        container.innerHTML += '<a href="cadastro.html">+</a>';
        return;
    }

    const table = document.createElement("table");

    const header = `
        <tr>
            <th>ID</th>
            <th>Prioridade</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Recursos Necessários</th>
            <th>Data Limite</th>
            <th>Matrícula</th>
        </tr>
    `;
    table.innerHTML = header;

    tarefas.forEach(t => {
        const tr = document.createElement("tr");

        if (t.prioridade === "Urgente") {
            tr.classList.add("urgente");
        }

        const recursosExibicao = Array.isArray(t.recursosNecessarios)
            ? t.recursosNecessarios.join(", ")
            : (t.recursosNecessarios ? String(t.recursosNecessarios) : "");

        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.prioridade}</td>
            <td>${t.descricao}</td>
            <td>${t.local}</td>
            <td>${recursosExibicao}</td>
            <td>${t.dataLimite}</td>
            <td>${t.matricula}</td>
        `;

        table.appendChild(tr);
    });

    container.appendChild(table);
}
