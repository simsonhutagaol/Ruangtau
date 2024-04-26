

const { Profile, Course, User, UserCourse, Category } = require('../models/index')
const { Op, fn, where } = require('sequelize')
const sequelize = require('sequelize');
const category = require('../models/category');
const formatDOB = require('../helper/time');

class ControllerAdmin {
    static async renderHome(req, res) {
        try {
            const course = await Course.findAll()
            const category = await Category.findAll()
            const student = await User.findAll({ where: { role: 'student' } })
            const totalCourse = course.length
            const totalCategory = category.length
            const totalStudent = student.length

            // res.send(totalCourse)
            res.render('admin/dashboard', { totalCourse, totalCategory, totalStudent })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderCategory(req, res) {
        try {
            // const category = await Category.findAll()
            const category = await Category.findAll({
                attributes: [
                    'id',
                    'name',
                    [sequelize.fn('COUNT', sequelize.col('Courses.id')), 'count']
                ],
                include: [{
                    model: Course,
                    attributes: []
                }],
                group: ['Category.id', 'Category.name'],
                order: [['count', 'DESC']]
            })
            // let abc = cat
            // res.send(cat)
            res.render('admin/category', { category })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderCourse(req, res) {
        try {
            const { search } = req.query
            // console.log(search){}
            let course = {}
            if (search) {
                course = await Course.findAll({
                    where: {
                        name: {
                            [sequelize.Op.iLike]: `%${search}%` // Replace 'searchTerm' with your actual search term
                        }
                    }, include: Category,
                    order: [['name', 'ASC']]
                })
            } else {
                course = await Course.findAll({ include: Category })
            }
            res.render('admin/course', { course })
        } catch (err) {
            console.log(err)
            res.send(err.message)
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
            // res.send(profile)
            res.render('admin/profile', { user, formatDOB })
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
            const { name } = req.body
            // console.log(name)
            await Category.create({ name })
            res.redirect('/admin/category')
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async renderAddCourse(req, res) {
        try {
            let errors = []
            if (req.query.error) {
                errors = req.query.error.split(',')
            }
            const category = await Category.findAll()
            res.render('admin/addCourse', { category, errors })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }

    }
    static async handleAddCourse(req, res) {
        try {
            const { name, description, duration, CategoryId } = req.body
            await Course.create({ name, description, duration, CategoryId })
            res.redirect('/admin/course')
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeValidationError") {
                const errorMessage = error.errors.map(err => err.message)
                res.redirect(`/admin/course/add?error=${errorMessage}`)
                return
            }
            res.send(error.message)
        }

    }
    static async renderEditCourse(req, res) {
        try {
            let errors = []
            if (req.query.error) {
                errors = req.query.error.split(',')
            }
            const id = req.params.id
            const course = await Course.findByPk(Number(id), { include: Category });
            const category = await Category.findAll()
            // res.send(course)
            res.render('admin/editCourse', { course, category, errors })
        } catch (err) {
            console.log(err)
            res.send(err.message)
        }
    }
    static async handleEditCourse(req, res) {
        try {
            const id = req.params.id
            const { name, description, duration, CategoryId } = req.body
            await Course.update({ name, description, duration, CategoryId }, { where: { id } });
            res.redirect('/admin/course')
        } catch (error) {
            console.log(error)
            const id = req.params.id
            if (error.name === "SequelizeValidationError") {
                const errorMessage = error.errors.map(err => err.message)
                res.redirect(`/admin/course/${id}/edit?error=${errorMessage}`)
                return
            }
            res.send(error.message)
        }
    }
    static async renderDetailCourse(req, res) {
        try {
            const id = req.params.id
            // console.log(id)
            const course = await Course.findOne({ where: { id: Number(id) } })
            // res.send(course)
            res.render('admin/seeDetail', { course })
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }
}

module.exports = ControllerAdmin