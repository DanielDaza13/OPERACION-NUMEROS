 const passport = require('passport');
 const LocalEstrategy = require('passport-local').Strategy;

 const User = require('../models/user');
 const { Passport } = require('passport');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id);
    done(null,user);
});

 passport.use('local-signup', new LocalEstrategy({
     usernameField:'email',
     passwordField: 'password',

     passReqToCallback: true
 }, async(req, email, password,  done) => {

    const user = await User.findOne({email: email});
    if(user){
        return done(null, false, req.flash('signupMessage','El usuario ya esta registrado'));
    }else{
        const newUser = new User(); 
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    await newUser.save();
    done(null, newUser);
    }

    
 }));


 passport.use('local-signin', new LocalEstrategy({
    usernameField:'email',
    passwordField: 'password',
    passReqToCallback: true
 }, async(req, email, password, done) => {
     const user = await User.findOne({email: email});

     if(!user){
        return done(null, false, req.flash('signinMessage','No se encontro el Usuario'));
    }
    if(!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage','Password Incorrecta'));
    }
    done(null, user);
 }));