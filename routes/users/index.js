module.exports = (express) => {
  const router = express.Router();

  const models = require('../../models');

  router.get('/', function (req, res) {
    if (typeof req.query.columns != "undefined") {
      options["attributes"] = req.query.columns
    }

    let options = {
      order: [['email', 'ASC']]
    };
    models.users.findAll(options).then((users) => {
      res.json(users);
    }).catch((err) => {
      res.status(500).send('Error: listing users!');
    });
  });

  router.post('/', (req, res) => {
    if (typeof req.body == "undefined") {
      return res.status(500).send("Error");
    }

    let options = {};
    models.users.create(req.body, options).then((result) => {
      res.status(200).send("OK");
    }).catch((err) => {
      return res.status(500).send("Error: " + err);
    });
  });

  router.put('/', (req, res) => {

    if (typeof req.body == "undefined") {
      return res.status(500).send("Error");
    }
    let options = {
      where: {
        id: req.body.id
      }
    };
    delete req.body.id;
    models.users.update(req.body, options).then((result) => {
      res.status(200).send("OK");
    }).catch((err) => {
      console.error(err);
    });
  });

  router.delete('/', (req, res) => {
    if (typeof req.body.id != "undefined") {
      models.users.destroy({ where: { id: req.body.id } }).then((result) => {
        res.status(200).send("OK");
      }).catch((err) => {
        console.error(err);
        res.status(500).send("Error");
      });
    }
    else {
      res.status(500).send("Error");
    }
  });

  return router;
}
