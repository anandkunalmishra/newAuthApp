const app = require('./app');
const { PORT } = process.env;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
