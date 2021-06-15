const typeorm = require("typeorm");

class Creator {
  constructor(id, name, img, ytURL) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.ytURL = ytURL;
  }
}

const EntitySchema = require("typeorm").EntitySchema;

const CreatorSchema = new EntitySchema({
  name: "Creator",
  target: Creator,
  coloumns: {
    id: {
      primary: true,
      type: "int",
      generataed: true,
    },

    name: {
      type: "varchar",
    },

    img: {
      type: "text",
    },

    ytURL: {
      type: "text",
    },
  },
});

async function getConnection() {
  return await typeorm.createConnection({
    type: "typeorm",
    host: "localhost",
    port: 3386,
    username: "root",
    password: "password",
    database: "fullstackDB",
    synchronize: true,
    logging: false,
    entities: [CreatorSchema],
  });
}

async function getAllCreators() {
  //connection

  const connection = await getConnection();
  const creatorRepo = connection.getRepository(Creator);

  // load the data in the repo
  const creators = await creatorRepo.find();
  connection.close();
  return creators;
}

async function insertCreators(name, img, ytURL) {
  // connection
  const connection = await getConnection();

  //create

  const creator = new Creator();
  creator.name = name;
  creator.img = img;
  creator.ytURL = ytURL;

  // save

  const creatorRepo = connection.getRepositiory(Creator);
  const res = await creatorRepo.save(Creator);

  //return list

  const allCreators = await creatorRepo.find();
  connection.close();
  return allCreators;
}

module.exports = {
  getAllCreators,
  insertCreators,
};
