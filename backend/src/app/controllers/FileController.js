import File from '../models/File';

class FileController {
  async store(req, res) {
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' });
    }

    const { originalname: name, filename: path } = req.file;

    const { id, url } = await File.create({
      name,
      path,
    });

    return res.json({
      id,
      name,
      path,
      url,
    });
  }
}

export default new FileController();
