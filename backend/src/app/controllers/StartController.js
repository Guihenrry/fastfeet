import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Order from '../models/Order';

class StartController {
  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not exists' });
    }

    if (order.start_date) {
      return res.status(400).json({ error: 'Order already withdrawn' });
    }

    /**
     * Verify if delivery has most 5 orders in day
     */
    const actualDate = new Date();

    const withdrawnCount = await Order.findAll({
      where: {
        deliveryman_id: order.deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(actualDate), endOfDay(actualDate)],
        },
      },
    });

    if (withdrawnCount.length >= 5) {
      return res.status(401).json({
        error: 'The delivery person can only make 5 withdrawals per day.',
      });
    }

    order.start_date = actualDate;

    await order.save();

    return res.json(order);
  }
}

export default new StartController();
