const Appointment = require('../../models/Appointment');
const User = require('../../models/User');
module.exports = (app) => {





//--------------------------------------------------------------------------
// UPDATE APPOINTMENT

app.put('/appointment/update', (req, res, next)=>{
	const { body } = req;
    let {
    	_id,
    	mType,
    	day,
    	startHour,
    	endHour
    } = body;
    if(mType && day && startHour && endHour){
        Appointment.updateOne(
    	{_id: _id},
    	{
    		$set: { mType: mType, day: day, startHour: startHour, endHour: endHour }
    	}, (err, appoint) =>{
    	if(err){
			return res.send({
				success: false,
				message: 'Error: Error updating the appointment'
			});
		}
		  res.send({
			success: true,
			message: 'Appointment updated'
		});
    	}
    );    	
    }
    else{
    return res.send({
    	success: false,
    	message: 'Error: Error updating the appointment, incomplete params'
    });
}
 });
//-------------------------------------------------------------------------
//-----DELETE APPOINTMENT
app.delete('/appointment/remove', (req, res, next) => {
	const { query } = req;
	let { _id } = query;

	Appointment.deleteOne({
		_id:_id
	}, (err)=>{
		if(err){
			return res.send({
				success: false,
				message: 'Error: Error deleting the appointment'
			});
		}
		return res.send({
			success: true,
			message: 'Appointment deleted'
		});
	});
});


//-----------------------------------------------------------------------------
// GET APPOINTMENTS EMPLOYEE
 app.get('/appointment/massage', (req, res, next) => {
  	const { query } = req;
  	let { email } = query;

  	email=email.toLowerCase();
  	email=email.trim();


  	Appointment.find({
  		idMassageU: email
  	}, (err, appoints) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(appoints);
  		if(appoints.length < 1){
  			return res.send({
  				success: false,
  				message: 'No appointments found for the user'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			appoints: appoints
  		});

  	});
  });

//-----------------------------------------------------------------------------
// GET APPOINTMENTS CLIENT

 app.get('/appointment/client', (req, res, next) => {
  	const { query } = req;
  	let { email } = query;

  	email=email.toLowerCase();
  	email=email.trim();


  	Appointment.find({
  		clientEmail: email
  	}, (err, appoints) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(appoints);
  		if(appoints.length < 1){
  			return res.send({
  				success: true,
  				message: 'No appointments found for the client'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			appoints: appoints
  		});

  	});
  });


//-----------------------------------------------------------------------------
//CREATE APPOINTMENT
app.post('/api/appointment/create', (req, res, next) => {
	const { body } = req;
    let {
    	clientEmail,
    	idMassageU,
    	mType,
    	day,
    	startHour,
    	endHour
    } = body;
    if (!clientEmail){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a client'
  		});
  	}
  	    if (!idMassageU){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a massage person asigned.'
  		});
  	}
    if (!mType){
  		return res.end({
  			success: false,
  			message: 'Error: A massage type must be specified.'
  		});
  	}
    if (!day){
  		return res.end({
  			success: false,
  			message: 'Error: The Appointment must have a day'
  		});
  	}
    if (!startHour){
  		return res.end({
  			success: false,
  			message: 'Error: The Appointment must have an start hour.'
  		});
  	}

  	clientEmail=clientEmail.toLowerCase();
  	clientEmail=clientEmail.trim();
    User.find({
    	email: clientEmail
    }, (err, users) => {
    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	let u = users[0];
    	if (!u){
    		console.log(u);
    		return res.send({
    			success: false,
    			message: 'Error: Server error 2'
    		});
    	}    	
    	// Si existe el usuario que va a crear la reserva
    const newAppointment = new Appointment();
      newAppointment.clientEmail=u.email;
      newAppointment.idMassageU=idMassageU;
      newAppointment.mType = mType;
      newAppointment.day = day;
      newAppointment.startHour = startHour;
      if(endHour){
      newAppointment.endHour = endHour;
      }
      newAppointment.save((err, appoint) => {
        if (err) {
        	console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Appointment created'
        });
      });
    });

    });
};
