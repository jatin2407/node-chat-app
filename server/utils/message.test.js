var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage' , () => {
  it('should generate correct message object' , () => {
    var from = "jatin";
    var text = "hii";
    var message = generateMessage(from,text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct Location' , () => {
    var from = "jatin";
    var latitude = 1;
    var longitude = 1;
    var url = `https://www.google.com/maps?q=1,1`;
    var message = generateLocationMessage(from,latitude,longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from,url});
  });
});
