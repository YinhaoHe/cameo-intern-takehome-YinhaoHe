import express from 'express';
import talentData from '../src/TALENT_DATA.json';
// import Joi from 'joi';
const router = express.Router();

/**
 * Implement a new endpoint HTTP GET /search that accepts a query, and returns a filtered list of talent based on that query.
 * A user should be able to search by username, name, or category.
 * Note: A list of Cameo talent is provided in TALENT_DATA.json
 */

router.get('/', (req, res) => {

  // More advanced input validation TO DO

  // const schema = {
  //   name: Joi.string().max(1000).required()
  // };
  // const result = Joi.validate(req.query, schema);
  // console.log(result)

  if (req.query === null || req.query.length > 1000) {
    res.status(404).send('Please enter your search, max 1000 characters');
  }

  let data = talentData.find(c => c.username.toLowerCase() === req.query.username.toLowerCase()); // search by username first; username should be unique
  // if username doesn't match; try search if this is a name
  if (!data) {
    let nameList = [];
    for (let i = 0; i < talentData.length; ++i) {
      if (req.query.name.toLowerCase() === talentData[i].name.toLowerCase()) {
        nameList.push(talentData[i]);
      }
    }
    if (nameList.length === 0) {
      let categoryList = [];
      for (let i = 0; i < talentData.length; ++i) {
        if (req.query.category.toLowerCase() === talentData[i].category.toLowerCase()) {
          categoryList.push(talentData[i]);
        }
      }
      if (categoryList.length === 0) {
        res.send(null);
        return;
      }
      return res.send(categoryList);
    }
    return res.send(nameList);
  }
  let usernameList = [];
  usernameList.push(data)
  return res.send(usernameList);
});

module.exports = router;
