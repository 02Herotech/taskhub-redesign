const Stomp = require("stompjs");
var SockJS = require("sockjs-client");
const URL_LINK = `https://smp.jacinthsolutions.com.au/ws`;
SockJS = new SockJS(URL_LINK);

global.stompClient = Stomp.over(SockJS);

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var stompClient: any;
}

export const stompClient = global.stompClient;
