const axios = require("axios");

const Dev = require("../models/Dev");

const parseStringAsArray = require("../utils/paseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json({ devs });
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const axiosResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { avatar_url, bio, name = login } = axiosResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        avatar_url,
        name,
        github_username,
        techs: techsArray,
        bio,
        location
      });
    }

    res.json(dev);
  }
};
