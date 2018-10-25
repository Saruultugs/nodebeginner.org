const URL = require("url").URL;

let registeredHandlers = {};

module.exports = {
    register: (method, pathname, requestHandler) => {
        registeredHandlers[method + pathname] = requestHandler;
    },
    route: (request, response) => {
        const pathname = new URL(`http://localhost${request.url}`).pathname;
        const handlerId = request.method + pathname;
        console.log(`About to route request for ${request.method} ${pathname}`);
        if (typeof registeredHandlers[handlerId] === 'function') {
            registeredHandlers[handlerId](response);
            return true;
        } else {
            console.log(`No request handler found for ${request.method} ${pathname}`);
            return false;
        }
    }
};
