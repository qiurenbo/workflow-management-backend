import { Model, DataTypes } from "sequelize";
import sequelize from "../config/mariadb";
export default class Addr extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  name: string;
  addr: string;
  tel: string;
  type: string;
}

Addr.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    addr: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize,
    tableName: "addr",
  }
);

Addr.sync({ force: true });
