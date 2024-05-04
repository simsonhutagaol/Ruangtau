

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}



const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path');
const bodyParser = require('body-parser');
// const PORT = 3000
//=================================
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
const session = require('express-session')
app.use(session({
    secret: 'rahasia dong',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true }
}))
//===================================
const ControllerStudent = require('./controllers/controllerStudent')
const ControllerAdmin = require('./controllers/controllerAdmin')
const ControllerHome = require('./controllers/controllerHome')
//===================================
const captchaUrl = '/captcha.jpg';
const captchaMathUrl = '/captcha_math.jpg';
const captchaSessionId = 'captcha';
const captchaFieldName = 'captcha';
const captcha = require('svg-captcha-express').create({
    cookie: captchaSessionId
});
//===================================load custom font (optional)
captcha.loadFont(path.join(__dirname, './fonts/Comismsh.ttf'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get(captchaUrl, captcha.image());
app.get(captchaMathUrl, captcha.math());
//====================================Midleware
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
const student = function (req, res, next) {
    if (req.session.user?.role === 'student') {
        if (req.session.user.id) {
            next()
        }
    } else {
        const error = `LOGIIN DULU CUY`
        res.redirect(`/login?error=${error}`)
    }
}
const admin = function (req, res, next) {
    if (req.session.user?.role === 'admin') {
        if (req.session.user.id) {
            next()
        }
    } else {
        const error = `LOGIIN DULU CUY`
        res.redirect(`/login?error=${error}`)
    }
}
const captchaCheck = function (req, res, next) {
    let valid = captcha.check(req, req.body[captchaFieldName])
    if (valid) {
        next()
    } else {
        const error = `Incorret Captcha, try again..`
        res.redirect(`/login?error=${error}`)
    }
}
//=======================================root home app
app.get('/', home, ControllerHome.renderHome)
app.get('/register', home, ControllerHome.renderRegister)
app.post('/register', home, ControllerHome.handleRegister)
app.get('/login', home, ControllerHome.renderLogin)
app.post('/login', home, captchaCheck, ControllerHome.handleLogin)
app.get('/logout', ControllerHome.handleLogout)
//==========================================root student
app.get('/student', student, ControllerStudent.renderHome)
app.get('/student/profile', student, ControllerStudent.renderProfile)
app.get('/student/profile/edit', student, ControllerStudent.renderEditProfile)
app.post('/student/profile/edit', student, ControllerStudent.handleEditProfile)
app.get('/student/course/:id/detail', student, ControllerStudent.renderDetailCourse)
app.get('/student/course/:id/unsubscribe', student, ControllerStudent.handleDeleteUserCourse)
app.get('/student/course/:id/subscribe', student, ControllerStudent.handleAddUserCourse)
//==========================================root admin
app.get('/admin', admin, ControllerAdmin.renderHome)
app.get('/admin/category', admin, ControllerAdmin.renderCategory)
app.get('/admin/course', admin, ControllerAdmin.renderCourse)
app.get('/admin/profile', admin, ControllerAdmin.renderProfile)
app.get('/admin/category/add', admin, ControllerAdmin.renderAddCategory)
app.post('/admin/category/add', admin, ControllerAdmin.handleAddCategory)
app.get('/admin/course/add', admin, ControllerAdmin.renderAddCourse)
app.post('/admin/course/add', admin, ControllerAdmin.handleAddCourse)
app.get('/admin/course/:id/edit', admin, ControllerAdmin.renderEditCourse)
app.post('/admin/course/:id/edit', admin, ControllerAdmin.handleEditCourse)
app.get('/admin/course/:id/detail', admin, ControllerAdmin.renderDetailCourse)
//===========================================
app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}! 👍`);
});