from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


def init_db():
    with sqlite3.connect('tasks.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL                       
                       )''')
        conn.commit()

def get_db_connection():
    conn = sqlite3.connect("tasks.db") 
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    tasks = []
    for row in cursor.fetchall():
        tasks.append(dict(row))
    conn.close()
    return jsonify(tasks)

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    task = cursor.fetchone()
    conn.close()
    if task:
        return jsonify({"id": task["id"], "title": task["title"]})
    else:
        return jsonify({"error": "Task not found"}), 404


@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    title = data.get('title')

    if not title:
        return jsonify({"error": "Title is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Calcular o próximo ID disponível
    cursor.execute("SELECT MAX(id) FROM tasks")
    max_id = cursor.fetchone()[0]
    next_id = (max_id + 1) if max_id is not None else 1

    # Inserir a nova tarefa com o ID calculado
    cursor.execute("INSERT INTO tasks (id, title) VALUES (?, ?)", (next_id, title))
    conn.commit()
    conn.close()

    return jsonify({"id": next_id, "title": title}), 201

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Task deleted successfully"}), 200

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    title = data.get('title')

    if not title:
        return jsonify({"error": "Title is required"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET title = ? WHERE id = ?", (title, task_id))
    conn.commit()
    conn.close()

    return jsonify({"message": "Task updated successfully", "id": task_id, "title": title}), 200
if __name__ == '__main__':
    init_db()
    app.run(debug=True, port="5001")

# - Criar o front end
# - montar a estrutura do projeto

