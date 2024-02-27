const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let roverTest = new Rover(98382);
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK'), new Command('MOVE',1234),new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 1234), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);    // Passes 98382 as the rover's position.
  let response = rover.receiveMessage(message);


  it("constructor sets position and default values for mode and generatorWatts", function() {
   expect(roverTest.mode).toBe('NORMAL');
   expect(roverTest.position).toBe(98382);
   expect(roverTest.generatorWatts).toBe(110);
});

it("response returned by receiveMessage contains the name of the message", function() {
  expect(response.message).toBe('Test message with two commands')
});

it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  expect(response.results[0]).toBeDefined();
  expect(response.results[1]).toBeDefined();
});

it("responds correctly to the status check command", function() {
  
  expect(response.results[1]).toStrictEqual({completed: true, roverStatus: {mode: 'LOW_POWER', generatorWatts: 110, position: 98382}})
  //expect(response.results[1]).toBeDefined();
});

it("responds correctly to the mode change command", function() {
  expect(response.results[0]).toStrictEqual({completed: true})
  let message = new Message('CHANGE MODE', ['MODE_CHANGE','NORMAL']);
  expect(response.results[0]).toStrictEqual({completed: true})
});

it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  expect(response.results[2]).toStrictEqual({completed: false});
  expect(roverTest.position).toBe(98382);
});

it("responds with the position for the move command", function() {
  let commands = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK'), new Command('MOVE', 1234)];
  let response = rover.receiveMessage(message);
  expect(rover.position).toBe(1234);
});

});
