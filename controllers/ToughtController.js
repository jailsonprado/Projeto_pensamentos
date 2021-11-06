const { query } = require('express');
const Tought = require('../models/Tought');
const User = require('../models/User');

const { Op } = require('sequelize');

module.exports = class ToughtController {
  // mostrar pensamentos na home
  static async showToughts(req, res) {
    let search = '';
    if (req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';
    if (req.query.order) {
      order = 'ASC';
    } else {
      order = 'DESC';
    }

    const tougthsData = await Tought.findAll({
      include: User,
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      order: [['createdAt', order]],
    });

    const tougths = tougthsData.map((result) => result.get({ plain: true }));

    let toughtsQty = tougths.length;
    if (toughtsQty === 0) {
      toughtsQty = false;
    }

    res.render('toughts/home', { tougths, search, toughtsQty });
  }

  static async dashboard(req, res) {
    const userId = req.session.userid;

    const user = await User.findOne({
      where: {
        id: userId,
      },
      include: Tought,
      plain: true,
    });

    // Check if user exists
    if (!user) {
      res.redirect('./login');
    }

    const toughts = user.Toughts.map((result) => result.dataValues);

    let emptyTougths = false;
    if (toughts.length === 0) {
      emptyTougths = true;
    }

    res.render('toughts/dashboard', { toughts, emptyTougths });
  }

  static createToughts(req, res) {
    res.render('toughts/create');
  }
  // Create data
  static async createToughtsSave(req, res) {
    const tought = {
      title: req.body.title,
      UserId: req.session.userid,
    };

    try {
      await Tought.create(tought);
      req.flash('message', 'Pensamento criado com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log('Aconteceu um erro: ' + error);
    }
  }
  // Delete
  static async removeTought(req, res) {
    const id = req.body.id;
    const UserId = req.session.userid;
    try {
      await Tought.destroy({ where: { id: id, UserId: UserId } });

      req.flash('message', 'Pensamento removido com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log('Aconteceu um erro: ' + error);
    }
  }

  // Edit and update

  static async updateTought(req, res) {
    const id = req.params.id;
    const tought = await Tought.findOne({ where: { id: id }, raw: true });

    res.render('toughts/edit', { tought });
  }

  // edit update final method
  static async updateToughtSave(req, res) {
    const id = req.body.id;
    const tought = {
      title: req.body.title,
    };
    try {
      await Tought.update(tought, { where: { id: id } });
      req.flash('message', 'Pensamento atualizado com sucesso!');

      req.session.save(() => {
        res.redirect('/toughts/dashboard');
      });
    } catch (error) {
      console.log('aconteceu um erro: ', error);
    }
  }
};
