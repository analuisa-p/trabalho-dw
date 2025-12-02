const urlBase = "http://159.65.228.63/";
let recursos = [];

function addRecurso() {
    const valor = document.getElementById("recurso").value.trim();
    if (valor === "") return;

    recursos.push(valor);

    const li = document.createElement("li");
    li.textContent = valor;
    document.getElementById("listaRecursos").appendChild(li);

    document.getElementById("recurso").value = "";
}

async function salvar() {
    const prioridade = document.getElementById("prioridade").value;
    const descricao = document.getElementById("descricao").value.trim();
    const local = document.getElementById("local").value.trim();
    const dataLimite = document.getElementById("dataLimite").value;
    const matricula = document.getElementById("matricula").value;

    if (!prioridade || !descricao || !local || !dataLimite || !matricula) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const tarefa = {
        prioridade,
        descricao,
        local,
        recursosNecessarios: recursos,
        dataLimite: dataLimite.replace("T", " ") + ":00",
        matricula: Number(matricula)
    };

    await fetch(urlBase + "tarefas", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(tarefa)
    });

    alert("Tarefa cadastrada!");
    window.location.href = "lista.html";
}
