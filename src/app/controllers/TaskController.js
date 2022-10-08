import * as Yup from 'yup';
import Task from '../models/Task';

class TaskController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(401)
        .json({ error: 'A tarefa deve ter pelo menos 3 letras' });
    }

    const task = await Task.create(req.body);

    return res.status(201).send(task);
  }

  async delete(req, res) {
    const { id } = req.params;

    const task = await Task.destroy({ where: { id } });

    if (!task) {
      return res
        .status(401)
        .json({ error: 'Não foi possível deletar a tarefa' });
    }

    return res.json({ message: 'Tarefa deletada' });
  }

  async update(req, res) {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    const { description } = await task.update(req.body);

    return res.json({ id, description });
  }

  async show(req, res) {
    const { id } = req.params;

    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(400).json({ error: 'Tarefa não encontrada' });
    }

    return res.json(task);
  }

  async index(req, res) {
    const tasks = await Task.findAll();

    if (!tasks) {
      return res.json({ message: 'Não há tarefas para exibir' });
    }

    return res.json(tasks);
  }
}

export default new TaskController();
