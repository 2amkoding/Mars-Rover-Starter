class Rover {
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message){
      let response = {
         message: message.name,
         results: []
      }

      for (let i = 0; i < message.commands.length; i++){
         response.results.push(message.commands[i])
      }
      return response
   }

}

module.exports = Rover;

