const urlBase = "http://159.65.228.63/";
let tarefas = [];

async function atualizar() {
    const response = await fetch(urlBase + "tarefas");
    tarefas = await response.json();
    mostrarTabela();
}

function mostrarTabela() {
    const container = document.getElementById("conteudo");
    container.innerHTML = "";

    if (tarefas.length === 0) {
        container.innerHTML = "<h3>Nenhuma tarefa cadastrada</h3>";
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

        tr.innerHTML = `
            <td>${t.id}</td>
            <td>${t.prioridade}</td>
            <td>${t.descricao}</td>
            <td>${t.local}</td>
            <td>${t.recursosNecessarios.join(", ")}</td>
            <td>${t.dataLimite}</td>
            <td>${t.matricula}</td>
        `;

        table.appendChild(tr);
    });

    container.appendChild(table);
}
