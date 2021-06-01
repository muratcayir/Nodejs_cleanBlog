const Post = require('../models/Post');
const fs = require('fs');

exports.getAllPosts = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  const uploadDir = 'public/uploads';

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Post.create({
      ...req.body,
      image: '/uploads' + uploadeImage.name,
    });
    res.redirect('/');
  });
};

exports.deletePost = async (req, res) => {
  const posts = await Post.findOne({ _id: req.params.id });
  let deletedImage = __dirname + '/../public/' + posts.image;
  fs.unlinkSync(deletedImage);
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  let uploadeImage = req.files.image;
  
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.image= '/uploads/' + uploadeImage.name;
  post.save()
  res.redirect(`/posts/${req.params.id}`);

};
