const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Post = require('./models/Post');

const app = express();

//
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));

//ROUTES

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
     posts });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.post('/posts', async (req, res) => { // async - await yapısı kullanacğız.
  await Post.create(req.body)            // body bilgisini Post modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});

const port = 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
