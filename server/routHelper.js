const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const users_collection = 'users', user_db_name = 'lets_meet_web';
const addMeetupCollection = 'new_meetup';


function login(req, res) {
  console.log("/users/login is accessed");

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(user_db_name);
    const query_user = req.body;

    dbo.collection(users_collection).findOne(query_user, function (err, user) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      if (user) {

        return res.status(200).send(user);
      }
      return res.sendStatus(404);

    });
  });
}


function register(req, res) {
  console.log("/users/register is accessed");

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(user_db_name);
    const query_user = req.body;

    dbo.collection(users_collection)
      .findOne({ email: query_user.email }, function (err, user_found) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        if (user_found) {
          return res.sendStatus(400);
        }

        dbo.collection(users_collection).insertOne(query_user, function (err, result) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          res.sendStatus(201);
        });

      });
  });
}

function contactUs(req, res) {

  console.log("/contact_us is accessed");

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(user_db_name);
    const query_user = req.body;

    dbo.collection(users_collection)
      .findOne({ email: query_user.email }, function (err, user_found) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        if (user_found) {
          return res.status(200).send(user_found);
          console.log('good job!');
        }

        dbo.collection(users_collection).insertOne(query_user, function (err, result) {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
          res.sendStatus(201);
        });

      });
  });
}

function getUsers(req, res) {
  console.log("/users is accessed");

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(user_db_name);

    dbo.collection(users_collection).find({}).toArray(function (err, users) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (users) {
        console.log(users);

        return res.status(200).send(users);
      }

      return res.sendStatus(404);

    });
  });
}



function createmeetup(req, res) {
  console.log("/users/createmeetup is accessed");

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    const dbo = db.db(user_db_name);
    const queryUsers = req.body;
    console.log(queryUsers);
    dbo.collection(addMeetupCollection).insertOne(queryUsers, function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(201);
    });
  });
}

function ShowAllMeetups(req, res) {
  console.log("/users/ShowAllMeetups is accessed");
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    const dbo = db.db(user_db_name);
    const queryUsers = req.body;

    dbo.collection(addMeetupCollection).find({}).toArray(function (err, result) {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }

      if (result) {
        return res.status(200).send(result);
      }
      return res.sendStatus(404);

    })
  })
}

function deleteMeetup() {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(user_db_name);
    var myquery = { _id: "5e4128e529243d26cc047c1d" };
    dbo.collection(addMeetupCollection).deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  });
}

module.exports.register = register;
module.exports.login = login;
module.exports.contactUs = contactUs;
module.exports.getUsers = getUsers;
module.exports.createmeetup = createmeetup;
module.exports.ShowAllMeetups = ShowAllMeetups;
module.exports.deleteMeetup = deleteMeetup;