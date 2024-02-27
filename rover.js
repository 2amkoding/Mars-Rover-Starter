class Rover {
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let response = {
        message: message.name,
        results: []
      }
      for (let i = 0; i < message.commands.length; i++){
          let roverStatus = {mode: this.mode,
                            generatorWatts: this.generatorWatts,
                            position: this.position}
        
        if(message.commands[i].commandType === "STATUS_CHECK"){       
          response.results.push({completed: true, roverStatus: roverStatus});
        }
        if(message.commands[i].commandType === "MOVE" && this.mode === "NORMAL"){
          response.results.push({completed: true});
          this.position = message.commands[i].value
        } 
        if(message.commands[i].commandType === "MOVE" && this.mode === "LOW_POWER"){
          response.results.push({completed: false});
        } 
        if(message.commands[i].commandType === "MODE_CHANGE"){
          response.results.push({completed: true});
        }
        if(message.commands[i].value === "LOW_POWER"){
          this.mode = "LOW_POWER";
        }
        if(message.commands[i].value === "NORMAL"){
          this.mode = "NORMAL";
        }
      }
      return response
    }

}

module.exports = Rover;

