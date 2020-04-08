import * as Yup from 'yup';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Mail from '../../lib/Mail';

class OrderController {
  async show(req, res) {
    const order = await Order.findOne({
      attributes: ['id', 'product'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    return res.json(order);
  }

  async index(req, res) {
    const { q } = req.query;

    const orders = await Order.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
          include: {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: File,
          as: 'signature',
        },
      ],
      where: {
        product: {
          [Op.iLike]: q ? `%${q}%` : '%',
        },
      },
      order: [['created_at', 'DESC']],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    /**
     * Verify if Deliveryman exists
     */
    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not exists' });
    }

    /**
     * Verify if Recipient exists
     */
    const recipient = await Recipient.findByPk(req.body.recipient_id);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient not exists' });
    }

    const order = await Order.create(req.body);

    /**
     * Send mail for deliveryman
     */

    await Mail.sendMail({
      to: `${deliveryman.name}  <${deliveryman.email}>`,
      subject: 'Encomenda disponível para a retirada',
      template: 'productAvailable',
      context: {
        deliveryman: deliveryman.name,
        product: order.product,
        name: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        state: recipient.state,
        city: recipient.city,
        zip_code: recipient.zip_code,
      },
    });

    return res.json(order);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string()
        .trim()
        .min(1),
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails' });
    }

    const order = await Order.findByPk(req.params.id);

    /**
     * Verify if order exists
     */
    if (!order) {
      return res.status(401).json({ error: 'Order not exists' });
    }

    /**
     * Verify if Deliveryman exists
     */
    if (req.body.deliveryman_id) {
      const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

      if (!deliveryman) {
        return res.status(401).json({ error: 'Deliveryman not exists' });
      }
    }

    /**
     * Verify if Recipient exists
     */
    if (req.body.recipient_id) {
      const recipient = await Recipient.findByPk(req.body.recipient_id);

      if (!recipient) {
        return res.status(401).json({ error: 'Recipient not exists' });
      }
    }

    const { product, recipient_id, deliveryman_id } = await order.update(
      req.body
    );

    return res.json({
      product,
      recipient_id,
      deliveryman_id,
    });
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(401).json({ error: 'Order not exists' });
    }

    await order.destroy();

    return res.json();
  }
}

export default new OrderController();
