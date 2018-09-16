const Schedule = require('../../models/Schedule');
module.exports = (app) => {
// GET HORARIOS MASAJISTA (TODOS)
app.get('/schedule', (req, res, next) => {
  	const { query } = req;
  	let { idMasajista } = query;

  	idMasajista=idMasajista.toLowerCase();
  	idMasajista=idMasajista.trim();


  	Schedule.find({
  		idMasajista: idMasajista
  	}, (err, schedules) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		console.log(schedules);
  		if(schedules.length < 1){
  			return res.send({
  				success: true,
  				message: 'No schedules avaibles'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			schedules: schedules
  		});

  	});
  });
// POST HORARIO MASAJISTA 
app.post('/schedule/create', (req, res, next) => {
	const { body } = req;
    let {
    	day,
    	HoraLlegada,
    	HoraSalida,
    	idMasajista,
    	types
    } = body;
    if (!idMasajista){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a user'
  		});
  	}
  	    if (!day){
  		return res.end({
  			success: false,
  			message: 'Error: There must be a day asigned.'
  		});
  	}
    if (types.length<1){
  		return res.end({
  			success: false,
  			message: 'Error: At least a massage type must be specified.'
  		});
  	}
    if (!HoraLlegada){
  		return res.end({
  			success: false,
  			message: 'Error: The Schedule must have a day'
  		});
  	}
    if (!HoraSalida){
  		return res.end({
  			success: false,
  			message: 'Error: The Schedule must have an start hour.'
  		});
  	}
  	idMasajista=idMasajista.toLowerCase();
  	idMasajista=idMasajista.trim();
  	day=day.toLowerCase();
  	day=day.trim();
    Schedule.find({
    	idMasajista: idMasajista,
    	day: day
    }, (err, horarios) => {
    	if (err){
    		return res.send({
    			success: false,
    			message: 'Error: Server error'
    		});
    	}
    	let u = horarios[0];
    	if (u){
    		console.log(u);
    		return res.send({
    			success: false,
    			message: 'Ya existe un horario para ese dia'
    		});
    	} 
    const newSchedule = new Schedule();
      newSchedule.idMasajista=idMasajista;
      newSchedule.day=day;
      newSchedule.HoraLlegada = HoraLlegada;
      newSchedule.HoraSalida = HoraSalida;
      newSchedule.types = types;
      newSchedule.save((err, schedule) => {
        if (err) {
        	console.log(err);
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Schedule created'
        });
      });
    });

    });

// GET HORARIOS POR DIA
app.get('/schedule/day', (req, res, next) => {

  	const { query } = req;
  	let { day } = query;

  	day=day.toLowerCase();
  	day=day.trim();
  	Schedule.find({
  		day: day 
  	}, (err, schedules) =>{
  		if(err){
  			return res.send({
  				success: false,
  				message: 'Error: Server error'
  			});
  		}
  		if(schedules.length < 1){
  			return res.send({
  				success: true,
  				message: 'No schedules avaibles'
  			});
  		}
  		return res.send({
  			success: true,
  			message: 'OK',
  			schedules: schedules
  		});

  	});
  });
//----------------------------------------------------------------------------
// UPDATE SCHEDULE
app.put('/schedule/update', (req, res, next)=>{
	const { body } = req;
    let {
    	_id,
    	day,
    	HoraLlegada,
    	HoraSalida,
    	idMasajista,
    	types
    } = body;
    if(day && HoraSalida && HoraLlegada && types.length>1){
        Schedule.updateOne(
    	{_id: _id},
    	{
    		$set: { types: types, day: day, HoraSalida: HoraSalida, HoraLlegada: HoraLlegada }
    	}, (err, schedule) =>{
    	if(err){
			return res.send({
				success: false,
				message: 'Error: Error updating the schedule'
			});
		}
		  res.send({
			success: true,
			message: 'schedule updated'
		});
    	}
    );    	
    }
    else{
    return res.send({
    	success: false,
    	message: 'Error: Error updating the schedule, incomplete params'
    });
}
 });

//----------------------------------------------------------------------------
// DELETE SHCEDULE
app.delete('/schedule/remove', (req, res, next) => {
	const { query } = req;
	let { _id } = query;

	Schedule.deleteOne({
		_id:_id
	}, (err)=>{
		if(err){
			return res.send({
				success: false,
				message: 'Error: Error deleting the schedule'
			});
		}
		return res.send({
			success: true,
			message: 'schedule deleted'
		});
	});
});
}

