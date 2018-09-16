const Type = require('../../models/Type');
module.exports = (app) => {

	app.get('/types', (req,res)=>{
		Type.find({}, (err, types)=>{
			 res.send({
					success: true,
					types: types
				});
		});
	});
}
