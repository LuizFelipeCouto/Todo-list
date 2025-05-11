**#**  **To-Do List – Projeto Completo (Flask + SQLite + Front-end)**

Este é um projeto completo de ****To-Do List (Lista de Tarefas)**** que utiliza:

- ***Back-end com Flask (Python)**** e banco de dados ***SQLite****
- ***Front-end com HTML, CSS e JavaScript**** puro (sem frameworks)

**##**  **Funcionalidades**

- Visualizar todas as tarefas
- Adicionar uma nova tarefa
- Editar uma tarefa existente
- Excluir uma tarefa
- Interface visual com campos de entrada, botões e exibição em lista

**##**  **Estrutura do Projeto**

**##**  **Tecnologias Utilizadas**

**####** **Back-end:**

- Python 3
- Flask
- SQLite3

**####** **Front-end:**

- HTML5
- CSS3
- JavaScript (DOM + Fetch API)

**##**  **Como rodar localmente**

**####** **1. Clone o repositório:**

```bash

git clone https://github.com/seu-usuario/to-do-list.git

cd to-do-list

````

*#### 2. Instale as dependências:*

```bash

pip install -r requirements.txt

```

**####** **3. Inicie a aplicação:**

```bash

python app.py

```

**####** **4. Acesse no navegador:**

```

http://localhost:5001/

```

**##**  **Testando via Postman (opcional)**

Você também pode testar as rotas da API usando o [Postman](https://www.postman.com/):

- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/<id>`
- `DELETE /tasks/<id>`

**##** **💡 Objetivo educacional**

Este projeto foi feito com foco em aprendizado. O objetivo é entender como integrar uma API com um front-end básico, organizando as responsabilidades entre o servidor e o cliente de forma clara e modular.
