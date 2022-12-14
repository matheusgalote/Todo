import crypto from 'crypto';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'Já existe um usuário com esse email.' });
    }

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos inválidos' });
    }

    req.body.password = crypto
      .createHash('md5')
      .update(req.body.password)
      .digest('hex');

    const { id, name, email } = await User.create(req.body);

    return res.status(201).json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Não existe um usuário com esse id' });
    }

    await User.destroy({ where: { id } });

    return res.json({ message: 'Usuário deletado' });
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    req.body.password = crypto
      .createHash('md5')
      .update(req.body.password)
      .digest('hex');

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Não é possível atualizar o registro' });
    }
    const { name, email, password } = await user.update(req.body);

    return res.json({ name, email, password });
  }

  async index(req, res) {
    const users = await User.findAll();

    if (!users) {
      return res.json({ message: 'Ainda não existem usuários' });
    }

    return res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Usuário não existe' });
    }
    const user = await User.findByPk(id);

    return res.json(user);
  }
}

export default new UserController();
