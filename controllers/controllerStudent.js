

const { Profile, Course, User, UserCourse, Category } = require('../models/index')

class ControllerStudent {

    static async renderHome(req, res) {
        try {
            res.render('student/course')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async renderProfile(req, res) {
        try {
            res.render('student/profile')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async renderEditProfile(req, res) {
        try {
            res.render('student/edit')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async handleEditProfile(req, res) {
        try {

        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
}

module.exports = ControllerStudent