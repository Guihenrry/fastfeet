import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async show(req, res) {
    const deliveryman = await Deliveryman.findOne({
      attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' });
    }

    return res.json(deliveryman);
  }

  async index(req, res) {
    const { q } = req.query;

    const Deliverymans = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
      where: {
        name: {
          [Op.iLike]: q ? `%${q}%` : '%',
        },
      },
    });

    return res.json(Deliverymans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, name } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: {
        email,
      },
    });

    if (deliverymanExists) {
      return res
        .status(401)
        .json({ error: 'This delivery man already exists' });
    }

    const { id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(1),
      email: Yup.string().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.params.id);
    const { email, name } = req.body;

    if (email && email !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: {
          email,
        },
      });

      if (deliverymanExists) {
        return res
          .status(400)
          .json({ error: 'This delivery man already exists' });
      }
    }

    const { id, avatar_id } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists' });
    }

    await deliveryman.destroy();

    return res.json();
  }
}

export default new DeliverymanController();
