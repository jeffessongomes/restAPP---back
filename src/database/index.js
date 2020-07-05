import Sequelize from 'sequelize';

import User from '../app/models/User';
import Restaurant from '../app/models/Restaurant';
import Address from '../app/models/Address';
import Table from '../app/models/Table';

import databaseConfig from '../config/database';

const models = [User, Restaurant, Address, Table];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
