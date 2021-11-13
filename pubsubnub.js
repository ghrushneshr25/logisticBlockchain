const PubNub = require("pubnub");

const credentials = {
  publishKey: "pub-c-629e3d9a-39e5-40b8-9ff7-730adb9af52a",
  subscribeKey: "sub-c-74255554-448a-11ec-b8b9-8a14e969af06",
  secretKey: "sec-c-Y2VhOWQ2NGMtZGMxOC00OTk2LTk5OGMtYmYzMGFlN2M1ZmZj",
};

const CHANNELS = {
  TEST: "TEST",
  //   TESTTWO: "TESTTWO",
};

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }

  listener() {
    return {
      message: (messageObject) => {
        const { channel, message } = messageObject;

        console.log(
          `message received. channel : ${channel}, message : ${message}`
        );
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

// const testPubSub = new PubSub();

// testPubSub.publish({ channel: CHANNELS.TEST, message: "HELLO PUBNUB" });

module.exports = PubSub;
