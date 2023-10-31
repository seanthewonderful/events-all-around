import { User, Event, Favorite, Category, db } from './model.js'
import bcryptjs from 'bcryptjs'
import lodash from 'lodash'

console.log("Syncing database")

await db.sync({ force: true })

console.log("Seeding database")

const categories = ["sports", "concert", "festival", "theater", "comedy"]
const dbCategories = []

for (let category of categories) {
    const newCategory = await Category.create({ name: category })
    dbCategories.push(newCategory)
}

const cities = ["Provo", "Orem", "American Fork", "Lehi", "Saratoga Springs", "Eagle Mountain", "Daybreak", "Draper", "Sandy", "Murray", "Salt Lake City", "Bountiful"]

let i = 1
while (i < 6) {

    const salt = bcryptjs.genSaltSync(5)
    const hash = bcryptjs.hashSync('asdf', salt)

    const newUser = await User.create({
        username: `user${i}`,
        password: hash,
    })

    const newEvent = await newUser.createEvent({
        title: `User${i}'s Event`,
        state: 'UT',
        city: lodash.sample(cities)
    })

    const randomCategory = lodash.sample(dbCategories)

    await newUser.addCategory(randomCategory)
    await newEvent.addCategory(randomCategory)

    i++
}

const users = await User.findAll()
const events = await Event.findAll()

for (let user of users) {

    const event = lodash.sample(events)

    await user.createFavorite({
        eventId: event.eventId,
        comment: `I declare that I, ${user.username} am favoriting ${event.title}`
    })

}

await db.close()