

const { Model } = require('sequelize')
const { Op, fn, where } = require('sequelize')
const { Profile, Course, User, UserCourse, Category } = require('../models/index')
const sequelize = require('sequelize');
const formatDOB = require('../helper/time');
class ControllerStudent {

    static async renderHome(req, res) {
        try {
            const userId = req.session.user.id
            const myCourse = await UserCourse.findAll({
                where: {
                    UserId: Number(userId)
                },
                include: [
                    {
                        model: Course,
                        include: [
                            {
                                model: Category
                            }
                        ]
                    }
                ]
            })
            const query = `(SELECT "CourseId" FROM "UserCourses" WHERE "UserId" = ${userId})`
            const listCourse = await Course.findAll({
                where: {
                    id: {
                        [sequelize.Op.notIn]: sequelize.literal([query])
                    }
                }, include: [
                    {
                        model: Category
                    }
                ]
            })
            res.render('student/course', { myCourse, listCourse })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async renderDetailCourse(req, res) {
        try {
            const id = req.params.id
            const course = await Course.findOne({ where: { id: Number(id) } })
            res.render('admin/seeDetail', { course })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async handleDeleteUserCourse(req, res) {
        try {
            const courseId = req.params.id
            const userId = req.session.user.id
            await UserCourse.destroy({
                where: {
                    UserId: userId,
                    CourseId: courseId
                }
            })
            res.redirect('/student')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async handleAddUserCourse(req, res) {
        try {
            const UserId = req.session.user.id
            const courseId = req.params.id
            await UserCourse.create({ UserId, CourseId: Number(courseId) })
            res.redirect('/student')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
    static async renderProfile(req, res) {
        try {
            const userId = req.session.user.id
            const user = await User.findOne({
                include: Profile,
                where: {
                    id: Number(userId)
                }
            })
            res.render('student/profile', { user, formatDOB })
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