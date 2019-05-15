import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('This is test')
});

app.listen(3002, () => {
  console.log('Server is running..')
})