import React, { Component } from 'react';
class ScheduleHour extends Component {
	constructor(props){
		super(props);
		this.state = {
		fro:'',
		to:'',
		selected:false
		}

	}
/*	onTextChangeDay(event){
		this.setState({
			day: event.target.value
		});
	}
	setDay(event){
		const dia = event.target.value;
		this.setState({
			day: dia,
			selectedDay: dia
		});
		this.props.setDay(this.state.day);	
	}
	*/
	render(){
		let {
			fro,
			to,
			selected
		}=this.state;
		return(
			<div className="container">
			<div className="row">
			<div className="col-sm-1"></div>
			<div className="col-sm-4">
			<p>Hora de llegada</p>
			</div>
			<div className="col-sm-2"></div>
			<div className="col-sm-4">
			<p>Hora de Salida</p>
			</div>
			<div className="col-sm-1"></div>
			</div>
			<div className="row">
			<div className="col-sm-4">
			</div>
			<div className="col-sm-4">
				<button type="button" 
				className="btn btn-outline-dark"
				>Siguiente</button>
			</div>
			<div className="col-sm-4">
			</div>
			</div>
			</div>
					
			);
	}
}
export default ScheduleHour;