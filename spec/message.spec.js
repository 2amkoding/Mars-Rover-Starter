const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);


    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('name required'));
      });

    it("constructor sets name", function() {
        expect(message.name).toBe('Test message with two commands');
      });

    it("contains a commands array passed into the constructor as the 2nd argument”", function() {
        expect(message.commands).toEqual([{"commandType": "MODE_CHANGE", "value": "LOW_POWER"}, {"commandType": "STATUS_CHECK", "value": undefined}]);
      });
});

