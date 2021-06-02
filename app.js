const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload'); 
const fs = require('fs');
const postController = require('./controller/postController');
const pageController = require('./controller/pageController');

const app = express();

//
mongoose.connect('mongodb+srv://murat:wPZMj3mnxzzOBNpj@cluster.r5rto.mongodb.net/cleanblogs-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false,
}).then(()=>{
  console.log("db connected")
}).catch((error)=>
{
  console.log(error)
})

//Template Engine
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //URL okunmasını sağlıyor
app.use(express.json()); // Datayı JSON formatına çeviriyor
app.use(fileUpload()); // middleware olarak kaydediyoruz.
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

//ROUTES

app.get('/', postController.getAllPosts);
app.get('/posts/:id',postController.getPost);
app.post('/posts', postController.createPost);
app.delete('/posts/:id',postController.deletePost );
app.put('/posts/:id', postController.updatePost);
app.get('/about',pageController.getAboutPage);
app.get('/post',pageController.getPostPage);
app.get('/add_post',pageController.getAddPost);
app.get('/posts/edit/:id', pageController.getEditPage);




const port =process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
