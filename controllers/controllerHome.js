const { where } = require('sequelize')
const { Profile, Course, User, UserCourse, Category } = require('../models/index')
const bcrypt = require('bcrypt')
const svgCaptcha = require('svg-captcha');

class ControllerHome {
    static async renderHome(req, res) {
        try {
            res.render('home')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderRegister(req, res) {
        try {
            res.render('register')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async handleRegister(req, res) {
        try {
            const { name, email, password, dateOfBirth, phone, gender, background } = req.body
            const user = await User.create({ name, email, password })
            const UserId = user.id
            const profile = await Profile.create({ name, dateOfBirth, phone, gender, background, UserId })
            res.redirect('/login')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async renderLogin(req, res) {
        try {
            const { error } = req.query
            res.render('login', { error })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async handleLogin(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    //case login berhasil
                    req.session.user = { id: user.id, role: user.role } //set session si controller
                    if (req.session.user.id) {
                        if (req.session.user.role === 'student') {
                            return res.redirect('/student')
                        } else {
                            return res.redirect('/admin')
                        }
                    }
                } else {
                    const error = `invalid email/password`
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = `invalid email/password`
                return res.redirect(`/login?error=${error}`)
            }

        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async handleLogout(req, res) {
        try {
            req.session.destroy()
            // console.log(req.session)
            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
}

module.exports = ControllerHome