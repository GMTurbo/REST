
products = [
  {
    id: 1, //required for FIXTURE
    title:'Flint',
    price: 99,
    description: 'Flint is...',
    isOnSale:true,
    image: '/images/flint.png',
    reviews: [100,101],
    crafter: 200
  },
  {
    id: 2, // required for FIXTURE
    title:'Kindling',
    price: 249,
    description: 'Easily...',
    isOnSale: false,
    image: '/images/kindling.png',
    crafter: 201
  }];
  
contacts = [
  {
    id: 200,
    name: 'Giamia',
    about: 'Although Giamia came from a humble spark of lightning, he quickly grew to be a great craftsman, providing all the warming instruments needed by those close to him.',
    avatar: 'images/giamia.png',
    products: [1]
  },
  {
    id: 201,
    name: 'Anostagia',
    about: 'Knowing there was a need for it, Anostagia drew on her experience and spearheaded the Flint & Flame storefront. In addition to coding the site, she also creates a few products available in the store.',
    avatar: 'images/anostagia.png',
    products: [2]
  }
];

reviews = [
  {
    id: 100,
    product: 1,
    text: "Started a fire in no time!"
  },{
    id: 101,
    product: 1,
    text: "Not the brightest flame, but warm!"
}];

var Hapi = require('hapi');
var argv = require('minimist')(process.argv.splice(2));

var server = Hapi.createServer('0.0.0.0', argv.port ? argv.port : 3000, {cors:true});

var routes = [{
  method: 'GET',
  path: '/',
  handler: function(req, reply){
    return reply("i'm awake.  Que pasa?");
  }
},{
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        reply('hello world');
    }
},{
	method: 'GET',
	path: '/products/{id?}',
	handler: function(req, reply){
	  if(req.params.id){
      var id = req.params.id;
      for(var i = 0 ; i < products.length; i++){
        if(products[i].id == id)
          return reply(JSON.stringify(products[i]));
      }
      return reply([]);
    }
	  console.log('received request for products');
		return reply(JSON.stringify({products:products}));
	}
},{
  method: 'GET',
  path: '/reviews/{id?}',
  handler: function(req, reply){
    if(req.params.id){
      var id = req.params.id;
      for(var i = 0 ; i < reviews.length; i++){
        if(reviews[i].id == id)
          return reply(JSON.stringify(reviews[i]));
      }
      return reply([]);
    }
    console.log('received request for reviews');
    return reply(JSON.stringify({reviews:reviews}));
  }
},
{
  method: 'GET',
  path: '/contacts/{id?}',
  handler: function(req, reply){
    if(req.params.id){
      var id = req.params.id;
      for(var i = 0 ; i < contacts.length; i++){
        if(contacts[i].id == id)
          return reply(JSON.stringify(contacts[i]));
      }
      return reply([]);
    }
    console.log('received request for contacts');
    return reply(JSON.stringify({contacts:contacts}));
  }
}];

server.route(routes);

console.log("server starting on port " + (argv.port ? argv.port : 3000));

server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});
