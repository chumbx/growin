module.exports = (express) => {
  const router = express.Router();

  //Users
  router.use('/users', require('./users')(express));

  //Homepage
  router.get('/', function (req, res) {
    res.render('index', {  });
  });

  //Avoid non existant pages
  router.get('*', function (req, res) {
    res.status(404).send("Error: Not found");
  });

  return router;
}
