import { User, Event, Category } from '../db/model.js'


const handlerFunctions = {
    getAllUsers: async (req, res) => {
        res.json(await User.findAll())
    },

    getUserEvents: async (req, res) => {
        
        const userEvents = await Event.findAll({
            where: {
                userId: req.params.userId
            },
            include: Category
        })

        res.send(userEvents)
    },

    getUserFavoriteEvents: async (req, res) => {

        const user = await User.findByPk(req.params.userId)

        res.send(await user.getFavorites())
    }
}