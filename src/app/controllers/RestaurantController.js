import * as Yup from 'yup';

import Restaurant from '../models/Restaurant';
import Address from '../models/Address';

class RestaurantController {
  async index(req, res) {
    const { name, phone, address } = await Restaurant.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Address,
          as: 'address',
          attributes: ['street', 'postal_code', 'number', 'state', 'city'],
        },
      ],
    });
    return res.json({
      name,
      phone,
      address,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      phone: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation is fails' });
    }

    const { id, name, phone } = await Restaurant.create(req.body);

    return res.json({
      id,
      name,
      phone,
    });
  }
}

export default new RestaurantController();
