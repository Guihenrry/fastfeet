import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

const { Op } = require('sequelize');

class DeliveriesController {
  async index(req, res) {
    const { delivered } = req.query;
    let orders = [];

    if (JSON.parse(delivered)) {
      orders = await Order.findAll({
        where: {
          deliveryman_id: req.params.id,
          canceled_at: null,
          [Op.not]: [
            {
              end_date: null,
            },
          ],
        },
        include: [
          {
            model: Recipient,
            as: 'recipient',
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
          },
        ],
      });
    } else {
      orders = await Order.findAll({
        where: {
          deliveryman_id: req.params.id,
          canceled_at: null,
          end_date: null,
        },
        include: [
          {
            model: Recipient,
            as: 'recipient',
          },
          {
            model: Deliveryman,
            as: 'deliveryman',
          },
        ],
      });
    }

    return res.json(orders);
  }
}

export default new DeliveriesController();
