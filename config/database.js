const mongoose = require('mongoose');
const { mongoDB_URL } = process.env;

// Connect to MongoDB database
exports.connect = () => {
  mongoose.connect(mongoDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`DB connected successfully`);
  })
  .catch((error) => {
    console.log(`DB connection failed`);
    console.log(error);
    process.exit(1);
  });
};
