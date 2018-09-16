import React, { Component } from 'react';
import ScheduleDay from './ScheduleDay';
import ScheduleTypes from './ScheduleTypes';

class SetSchedule extends Component{
  constructor(props){
    super(props);
    this.state={
    	dia:'',
      tipos:'',
      horaInicio:'',
      horaFin:'', 
      correo:''
    }
    this.addSchedule=this.addSchedule.bind(this);
    this.setDay = this.setDay.bind(this);
    this.selectTypes = this.selectTypes.bind(this);
  }
    setDay(day){
    const dia = day;
    this.setState({
      dia: day,
    });
  }
  selectTypes(tipos){
    const tipes = tipos;
     this.setState({
      tipos: tipes,
    });

  }
  addSchedule(){
  }
  render (){
    let {
      dia,
      tipos,
      horaInicio,
      horaFin,
      correo
    }=this.state;
      if(dia){
        return(
          <div>
            <h1>{"Horario para el día:" + dia}</h1>
            <ScheduleTypes selectTypes={this.selectTypes}/>
          </div>
      );
      }else{
        return(
          <div>
            <ScheduleDay setDay={this.setDay}/>
          </div>
        );
          
      }
      
  };
};

export default SetSchedule;
