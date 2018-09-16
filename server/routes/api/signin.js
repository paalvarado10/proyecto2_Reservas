
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
module.exports = (app) => {
//-----------------------------------------------------------------------

app.get('/api/account/getMPerson', (req, res, next) =>{
  const { query } = req;
  const {
    role
  } = query;
  User.find({
    role: role
  }, (err, mList) => {
    if (err){
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (mList.lenght<1){
    return res.send({
      success: false,
      message: 'Error: Not found masasijstas'
    });  
    }
    return res.send({
      success: true,
      message: 'successfull request',
      mPersons: mList
    });
  });

});




//-----------------------------------------------------------------------
  app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
    	firstName,
    	lastName,
    	password
    } = body;
    let {
      email
    } = body;
    if (!firstName){
  		return res.end({
  			success: false,
  			message: 'Error: First name canoot be blank.'
  		});
  	}
  	if (!lastName){
  		return res.end({
  			success: false,
  			message: 'Error: Last name canoot be blank.'
  		});
  	}
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }

      const newUser = new User();
      newUser.firstName=firstName;
      newUser.lastName=lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up',
          token: user._id,
          email: email
        });
      });
    });
  }); 
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
    	password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
  }
    email = email.toLowerCase();
    email = email.trim();

    User.find({
    	email: email
    }, (err, users) => {

    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	if (users.length!=1){
    		return res.send({
    			success: false,
    			message: 'Error: Invalid email' 
    		});
    		}
    	const user = users[0];
    	if (!user.validPassword(password)) {
    		return res.send({
    			success: false,
    			message: 'Error: Invalid credentials'
    		});
    	}


    	const userSession = new UserSession;
    	userSession.userId = user._id;
    	userSession.save((err, doc) =>{
    		if (err) {
    			return res.send({
    				success: false,
    				message: 'Error: Server error'
    			});
    		}
    		return res.send({
    			success: true,
    			message: 'Valid sing in',
    			token: doc._id,
          email: user.email
    		});
    	}); 
    });
 });
//----------------------------------------------------
 app.get('/api/account/getById', (req, res, next) => {
    const { query } = req;
    const { id } = query;
    User.find({
      _id: id,
    }, (err, user) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if(!user || !user[0]){
          return res.send({
          success: false,
          message: 'Error: Invalid credentials'
        });
      }
        if(user[0]){
          return res.send({
          success: true,
          message: 'exito',
          email: user[0].email,
          role: user[0].role
        });
        }
        
    });
  });

//--------------------------------------------------------------------
 app.get('/api/account/get', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
      _id: token,
      //isDeleted: false
    }, (err, sessions) =>{
      if(err){
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if(sessions.length != 1){

        return res.send({
          success: false,
          message: 'Error: Invalid credentials'
        });
      }
      else {
        return res.send({
          success: true,
          message: 'Verified',
          userId: sessions.userId
        });
      }
    });
  });




//-----------------------------------------------------
  app.get('/api/account/verify', (req, res, next) => {
  	const { query } = req;
  	const { token } = query;

  	UserSession.find({
  		_id: token,
  		isDeleted: false
  	}, (err, sessions) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		if(sessions.length != 1){
  			return res.send({
  				success: false,
  				message: 'Error: Invalid credentials'
  			});
  		}
  		else {
  			return res.send({
  				success: true,
  				message: 'Verified',
          userId: sessions[0].userId
  			});
  		}
  	});
  });

  app.get('/api/account/logout', (req, res, next) => {
  	const { query } = req;
  	const { token } = query;


  	UserSession.findOneAndUpdate({
  		_id: token,
  		isDeleted: false
  	},{
  		$set: 
  		{
  			isDeleted: true
  		}
  	}, null, (err, sessions) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		else {
  			return res.send({
  				success: true,
  				message: 'Loged Out'
  			});
  		}
  	});
  });
};