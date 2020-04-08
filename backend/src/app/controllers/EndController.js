import fs from 'fs';
import { resolve } from 'path';
import Order from '../models/Order';
import File from '../models/File';

class EndController {
  async update(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const order = await Order.findByPk(req.params.id);

    const { originalname: name, filename: path } = req.file;

    function deleteImage() {
      if (path) {
        fs.unlinkSync(
          resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', path)
        );
      }
    }

    if (!order) {
      deleteImage();
      return res.status(400).json({ error: 'Order not exists' });
    }

    if (order.end_date) {
      deleteImage();
      return res
        .status(400)
        .json({ error: 'This order has already been delivered' });
    }

    const file = await File.create({
      name,
      path,
    });

    order.end_date = new Date();
    order.signature_id = file.id;

    await order.save();

    return res.json(order);
  }
}

export default new EndController();
