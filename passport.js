var LocalStrategy = require('passport-local').Strategy;
var db = require('./db.js');
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
    	console.log(user);
    	done(null, user.faculty_id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
    	db.query("select * from faculty where faculty_id = "+id,
    		function(err,rows){	
    				console.log('deserialize');
    			done(err, rows[0]);
    		});
    });


 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

	passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
    	console.log(req.body);
    	console.log(password);

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		db.query("select * from faculty where email = '"+email+"'",function(err,rows){
			console.log(rows);
			console.log("above row object");

			if (err)               
				return done(err);

			if (rows.length) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			} else {

				// if there is no user with that email
                // create the user
                var newUserMysql = new Object();

                newUserMysql.email    = email;
                newUserMysql.password = password; // use the generateHash function in our user model

                var insertQuery = "INSERT INTO faculty ( email, password,name,designation,contact ) values ('" + email +"','"+ password +"','"+
                req.body.name +"','"+ req.body.optradio +"','"+ req.body.telephone +"')";
                //console.log(insertQuery);
                db.query(insertQuery,function(err,rows){
                	newUserMysql.faculty_id = rows.insertId;

                	return done(null, newUserMysql);
                });	
            }	
        });
	}));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

    	db.query("SELECT * FROM faculty WHERE email = '" + email + "'",function(err,rows){
    		if (err)
    			return done(err);
    		if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 

			// if the user is found but the password is wrong
			if (!( rows[0].password == password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            console.log('login yes');
            return done(null, rows[0]);			

        });



    }));

};