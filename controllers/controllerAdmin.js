

const { Profile, Course, User, UserCourse, Category } = require('../models/index')

class ControllerAdmin {
    static async renderHome(req, res) {
        try {
            res.render('admin/dashboard')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderCategory(req, res) {
        try {
            res.render('admin/category')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderCourse(req, res) {
        try {
            res.render('admin/course')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderProfile(req, res) {
        try {
            res.render('admin/profile')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderAddCategory(req, res) {
        try {
            res.render('admin/addCategory')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async handleAddCategory(req, res) {
        try {
            // res.render('admin/addCategory')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderAddCourse(req, res) {
        try {
            res.render('admin/addCourse')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async handleAddCourse(req, res) {
        try {
            // res.render('admin/addCategory')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
}

module.exports = ControllerAdmin