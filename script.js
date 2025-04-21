document.querySelectorAll('.card').forEach(card => {
    const dia = card.getAttribute('data-dia'); // ex: "segunda"
    const tarefasDiv = card.querySelector('.tarefas');
    const lista = card.querySelector('.lista-tarefas');
    const input = card.querySelector('.input-tarefa');
    const btn = card.querySelector('.add-tarefa');
  
    // Função para salvar as tarefas no localStorage
    function salvarTarefas() {
      const tarefas = [];
      lista.querySelectorAll('li').forEach(li => {
        const texto = li.querySelector('span').innerText;
        const feito = li.querySelector('input').checked;
        tarefas.push({ texto, feito });
      });
      localStorage.setItem(dia, JSON.stringify(tarefas));
    }
  
    // Função para carregar tarefas do localStorage
    function carregarTarefas() {
      const dados = JSON.parse(localStorage.getItem(dia)) || [];
      lista.innerHTML = ''; // limpa antes de carregar
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
  
    // Expande e mostra/oculta tarefas
    card.addEventListener('click', () => {
      tarefasDiv.classList.toggle('hidden');
      card.classList.toggle('expanded');
    });
  
    // Botão de adicionar tarefa
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); // impede fechar ao clicar
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
  
    // Remoção de tarefa ou mudança de checkbox
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
  
    carregarTarefas(); // Carrega ao abrir
  });
  