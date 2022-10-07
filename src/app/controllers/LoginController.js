import crypto from 'crypto';
import * as Yup from 'yup';

import User from '../models/User';

class LoginController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Campos inválidos' });
    }

    const { email } = req.body;

    const hashPassword = crypto
      .createHash('md5')
      .update(req.body.password)
      .digest('hex');

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    if (user.password !== hashPassword) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    return res.json(user);
  }
}

export default new LoginController();
