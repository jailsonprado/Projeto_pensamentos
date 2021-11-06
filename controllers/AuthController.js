const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    res.render('auth/login');
  }
  // login user page
  static async loginPost(req, res) {
    const { email, password } = req.body;

    //find user, user exists?
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      req.flash('message', 'Usuario não encontrado!');
      res.render('auth/login');

      return;
    }

    // check if passwords math
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      req.flash('message', 'Senha errada! verifique a senha digitada');
      res.render('auth/login');

      return;
    }
    // initialize session
    req.session.userid = user.id;

    req.flash('message', 'Logado com sucesso!');

    req.session.save(() => {
      res.redirect('/');
    });
  }

  static register(req, res) {
    res.render('auth/register');
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    //  password match validation
    if (password != confirmpassword) {
      //mensagem
      req.flash('message', 'As senhas não conferem, tente novamente!');
      res.render('auth/register');

      return;
    }

    // Check if user exists
    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('message', 'Email já cadastrado!');
      res.render('auth/register');

      return;
    }

    // create a password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      // initialize session
      req.session.userid = createdUser.id;

      req.flash('message', 'Cadastrado com sucesso!');

      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }
  //logout user

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
