document.querySelectorAll('.card').forEach(card => {
  const dia = card.getAttribute('data-dia');
  const tarefasDiv = card.querySelector('.tarefas');
  const lista = card.querySelector('.lista-tarefas');
  const input = card.querySelector('.input-tarefa');
  const btnAdd = card.querySelector('.add-tarefa');
  const btnAbrir = card.querySelector('.abrir');
  const btnFechar = card.querySelector('.fechar');

  btnAbrir.addEventListener('click', (e) => {
    e.stopPropagation();
    tarefasDiv.classList.remove('hidden');
    btnAbrir.classList.add('hidden');
    btnFechar.classList.remove('hidden');
    card.classList.add('expanded');
  });

  btnFechar.addEventListener('click', (e) => {
    e.stopPropagation();
    tarefasDiv.classList.add('hidden');
    btnFechar.classList.add('hidden');
    btnAbrir.classList.remove('hidden');
    card.classList.remove('expanded');
  });

  function salvarTarefas() {
    const tarefas = [];
    lista.querySelectorAll('li').forEach(li => {
      const texto = li.querySelector('span').innerText;
      const feito = li.querySelector('input').checked;
      tarefas.push({ texto, feito });
    });
    localStorage.setItem(dia, JSON.stringify(tarefas));
  }

  function carregarTarefas() {
    const dados = JSON.parse(localStorage.getItem(dia)) || [];
    lista.innerHTML = '';
    dados.forEach(tarefa => {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox" ${tarefa.feito ? 'checked' : ''}>
        <span>${tarefa.texto}</span>
        <button class="remove">❌</button>
      `;
      lista.appendChild(li);
    });
  }

  btnAdd.addEventListener('click', (e) => {
    e.stopPropagation();
    if (input.value.trim() !== "") {
      const li = document.createElement('li');
      li.innerHTML = `
        <input type="checkbox">
        <span>${input.value}</span>
        <button class="remove">❌</button>
      `;
      lista.appendChild(li);
      input.value = '';
      salvarTarefas();
    }
  });

  lista.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      e.stopPropagation();
      e.target.parentElement.remove();
      salvarTarefas();
    }
  });

  lista.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      salvarTarefas();
    }
  });

  carregarTarefas();
});
