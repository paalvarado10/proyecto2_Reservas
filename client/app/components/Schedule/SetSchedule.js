import React, { Component } from 'react';
import ScheduleDay from './ScheduleDay';
import ScheduleTypes from './ScheduleTypes';
import ScheduleHour from'./ScheduleHour';

class SetSchedule extends Component{
  constructor(props){
    super(props);
    this.state={
    	dia:'',
      tipos:'',
      horaInicio:'',
      horaFin:'', 
      correo:this.props.emailUsuario
    }
    this.addSchedule=this.addSchedule.bind(this);
    this.setDay = this.setDay.bind(this);
    this.selectTypes = this.selectTypes.bind(this);
    this.setHour=this.setHour.bind(this);
  }
    setDay(day){
    const dia = day;
    this.setState({
      dia: day,
    });
  }
   setHour(ini,fin){
    this.setState({
      horaInicio: ini,
      horaFin: fin
    },()=>{
      let tipos = this.state.tipos.split(",");
      let{
        dia,
        horaInicio,
        horaFin,
        correo
      }=this.state;
      console.log("crear horario "+dia+" "+tipos[0]+" "
        +horaInicio+" "+horaFin+" "+correo+" ");
      fetch('/schedule/create',
        { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        day: dia,
        HorraLLegada: horaInicio+"",
        HoraSalida: horaFin+"",
        idMasajista: correo,
        types: tipos
      })
    }).then(res => res.json())
  .then(json => {
    if(json.success) {
      this.setState({
      dia:'',
      tipos:'',
      horaInicio:'',
      horaFin:'', 
      });
    }
  })
})
};
  
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
            <ScheduleTypes setHour={this.setHour}
            selectTypes={this.selectTypes}/>     
          </div>
      );
      }
      else{
        return(
          <div>
            <ScheduleDay setDay={this.setDay}/>
          </div>
        );
          
      }
      
  };
};

export default SetSchedule;
