let express = require('express')
let router = express.Router()

// Facades
let userFacade = require('../facades/userFacade')
let blogFacade = require('../facades/blogFacade')
let loginFacade = require('../facades/loginFacade')

// GET users
router.get('/users', async (req, res) => {
    res.json({ users: await userFacade.getAllUsers() })
})

// GET user by username
router.get('/user/username=:username', async (req, res) => {
    const username = req.params.username
    res.json({user: await userFacade.findByUsername(username) })
})

// GET user by id
router.get('/user/id=:id', async (req, res) => {
    const id = req.params.id
    res.json({user: await userFacade.findById(id) })
})

// POST user
router.post('/user', async (req, res) => {
    const { firstName, lastName, username, password, email } = req.body
    res.json( await userFacade.addUser(firstName, lastName, username, password, email) )
})

// GET blogs
router.get('/blogs', async (req, res) => {
    res.json({ blogs: await blogFacade.getAll() })
})

// GET blog by id
router.get('/blog/:id', async (req, res) => {
    const id = req.params.id
    res.json({ blog: await blogFacade.getById(id) })
})

// POST blog
router.post('/blog', async (req, res) => {
    const { info, pos, author } = req.body
    res.json( await blogFacade.addLocationBlog(info, pos, author))
})

// PUT blog likes
router.put('/blog', async (req, res) => {
    const { user_id, blog_id } = req.body
    res.json({ blog: await blogFacade.likeLocationBlog(user_id, blog_id) })
})

// POST user login
router.post('/login', async (req, res) => {
    const { username, password, latitude, longitude, distance } = req.body
    response = await loginFacade.login( username, password, latitude, longitude, distance )
    response.err ? res.send(response.status, response.err) : res.json(response)
})

module.exports = router