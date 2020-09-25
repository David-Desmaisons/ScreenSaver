const routes = [{
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "Hello World!";
  },
},
{
  method: '*',
  path: '/{any*}',
  handler: function (request, h) {
      return h.response('Resource Not Found!').code(404);
  }
}];

module.exports = {
  routes,
};
