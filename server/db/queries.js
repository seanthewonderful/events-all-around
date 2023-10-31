import { Sequelize, Op } from "sequelize";
import { User, Event, Category, Favorite, db } from './model.js'

const user1 = await User.findOne({ include: Favorite })
const event1 = await Event.findOne({ include: Favorite })
const cat1 = await Category.findOne()

console.log(user1.favorites)
console.log(event1.favorites)
console.log(cat1)

await db.close()