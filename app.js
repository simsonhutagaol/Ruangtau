const express = require('express')
const app = express()
const ControllerStudent = require('./controllers/controllerStudent')
const ControllerAdmin = require('./controllers/controllerAdmin')
const ControllerHome = require('./controllers/controllerHome')
const PORT = 3000
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
const session = require('express-session')
app.use(session({
    secret: 'rahasia dong',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true }
}))


const home = function (req, res, next) {
    if (req.session.user) {
        if (req.session.user.role === 'student') {
            res.redirect('/student')
        } else if (req.session.user.role === 'admin') {
            res.redirect('/admin')
        }
    } else {
        next()
    }
}
//root home app
app.get('/', home, ControllerHome.renderHome)
app.get('/register', home, ControllerHome.renderRegister)
app.post('/register', home, ControllerHome.handleRegister)
app.get('/login', home, ControllerHome.renderLogin)
app.post('/login', home, ControllerHome.handleLogin)
app.get('/logout', ControllerHome.handleLogout)

const student = function (req, res, next) {
    // console.log(req.session.role)
    if (req.session.user?.role === 'student') {
        if (req.session.user.id) {
            next()
        }
    } else {
        const error = `LOGIIN DULU CUY`
        res.redirect(`/login?error=${error}`)
    }
}


//root student
app.get('/student', student, ControllerStudent.renderHome)
app.get('/student/profile', student, ControllerStudent.renderProfile)
app.get('/student/profile/edit', student, ControllerStudent.renderEditProfile)
app.post('/student/profile/edit', student, ControllerStudent.handleEditProfile)
// app.post('/student/:stutendId/profile/:profileId/edit', ControllerStudent.handleEditProfile)


const admin = function (req, res, next) {
    // console.log(req.session.role)
    if (req.session.user?.role === 'admin') {
        if (req.session.user.id) {
            next()
        }
    } else {
        const error = `LOGIIN DULU CUY`
        res.redirect(`/login?error=${error}`)
    }
}

// //root admin
app.get('/admin', admin, ControllerAdmin.renderHome)
app.get('/admin/category', admin, ControllerAdmin.renderCategory)
app.get('/admin/course', admin, ControllerAdmin.renderCourse)
app.get('/admin/profile', admin, ControllerAdmin.renderProfile)
app.get('/admin/category/add', admin, ControllerAdmin.renderAddCategory)
app.post('/admin/category/add', admin, ControllerAdmin.handleAddCategory)
app.get('/admin/course/add', admin, ControllerAdmin.renderAddCourse)
app.post('/admin/course/add', admin, ControllerAdmin.handleAddCourse)




app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}! 👍`);
});