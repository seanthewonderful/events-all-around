import { DataTypes, Model } from 'sequelize'
import connectToDB from './db.js'
import util from 'util'

export const db = await connectToDB('postgresql:///events_all_around')

export class User extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(500),
            allowNull: false
        }
    },
    {
        modelName: 'user',
        sequelize: db
    }
)

export class Event extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
Event.init(
    {
        eventId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(30),
            allowNull: true
        },
        streetNumber: {
            type: DataTypes.STRING(10),
            allowNull: true
        }
    },
    {
        modelName: 'event',
        sequelize: db
    }
)

export class Category extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
Category.init(
    {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    },
    {
        modelName: 'category',
        sequelize: db
    }
)

export class Favorite extends Model {
    [util.inspect.custom]() {
        return this.toJSON()
    }
}
Favorite.init(
    {
        favoriteId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        modelName: 'favorite',
        sequelize: db
    }
)


User.hasMany(Event, { foreignKey: 'userId' })
Event.belongsTo(User, { foreignKey: 'userId' })

User.belongsToMany(Category, { through: 'UserCategoryPreferences' })
Category.belongsToMany(User, { through: 'UserCategoryPreferences' })

Event.belongsToMany(Category, { through: 'EventCategories' })
Category.belongsToMany(Event, { through: 'EventCategories' })

User.hasMany(Favorite, { foreignKey: 'userId' })
Favorite.belongsTo(User, { foreignKey: 'userId' })

Event.hasMany(Favorite, { foreignKey: 'eventId' })
Favorite.belongsTo(Event, { foreignKey: 'eventId' })
