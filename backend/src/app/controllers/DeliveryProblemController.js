import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class DeliveryProblemController {
  async index(req, res) {
    const deliveryProblem = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      order: [['created_at', 'DESC']],
    });

    return res.json(deliveryProblem);
  }

  async show(req, res) {
    const deliveryProblem = await DeliveryProblem.findAll({
      where: {
        delivery_id: req.params.id,
      },
    });

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string()
        .trim()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists' });
    }

    const { id, description, delivery_id } = await DeliveryProblem.create({
      description: req.body.description,
      delivery_id: req.params.id,
    });

    return res.json({ id, description, delivery_id });
  }

  async delete(req, res) {
    const deliveryProblem = await DeliveryProblem.findByPk(req.params.id);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Problem not exists' });
    }

    const order = await Order.findOne({
      where: {
        id: deliveryProblem.delivery_id,
      },
      attributes: ['id', 'product', 'canceled_at'],
      include: [
        {
          model: Deliveryman,
          attributes: ['id', 'name', 'email'],
          as: 'deliveryman',
        },
        {
          model: Recipient,
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
          as: 'recipient',
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    /**
     * Send mail for deliveryman
     */
    await Mail.sendMail({
      to: `${order.deliveryman.name}  <${order.deliveryman.email}>`,
      subject: 'Encomenda disponível para a retirada',
      template: 'deliveryCanceled',
      context: {
        description: deliveryProblem.description,
        deliveryman: order.deliveryman.name,
        product: order.product,
        name: order.recipient.name,
        street: order.recipient.street,
        number: order.recipient.number,
        complement: order.recipient.complement,
        state: order.recipient.state,
        city: order.recipient.city,
        zip_code: order.recipient.zip_code,
      },
    });

    return res.json(order);
  }
}

export default new DeliveryProblemController();
