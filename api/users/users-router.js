const express = require("express");
const router = express.Router();
const middleware = require("../middleware/middleware");
const userModel =require("./users-model");
const postsModel =require("../posts/posts-model");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir



router.get('/', async (req, res,next) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  try {
      const allUsers = await userModel.get();
      res.json(allUsers);
  } catch (error) {
      next(error);
  }
});

router.get('/:id', middleware.validateUserId, (req, res,next) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
    try {
      res.json(req.currentUser);
    
    } catch (error) {
      next(error);
    }
});

router.post('/', middleware.validateUser, async (req, res,next) => {
    try {
      const insertedUser = await userModel.insert({name: req.body.name});
      res.status(201).json(insertedUser);
    } catch (error) {
      next(error);
    // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
    // istek gövdesini doğrulamak için ara yazılım gereklidir.
    }});

router.put('/:id', middleware.validateUserId, middleware.validateUser, async (req, res,next) => {
  
  try {
      const updatedUser = await userModel.update(req.params.id,{name: req.body.name});
      res.json(updatedUser);
  } catch (error) {
    next(error);
  }
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
});

router.delete('/:id',middleware.validateUserId, async (req, res,next) => {
    try {
       await userModel.remove(req.params.id);
       res.json(req.currentUser);
    } catch (error) {
      next(error);
    }

  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
});

router.get('/:id/posts', middleware.validateUserId, async (req, res,next) => {
  try {
    userPost = await userModel.getUserPosts(req.params.id);
    res.json(userPost);
  } catch (error) {
    next(error);
  }
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
});

router.post('/:id/posts',middleware.validateUserId,middleware.validatePost, async (req, res,next) => {
  try {
      let insertedPost = await postsModel.insert({user_id: req.params.id,text:req.body.text});
      res.status(201).json(insertedPost);
  } catch (error) {
    next(error);
  }
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
});

// routerı dışa aktarmayı unutmayın

module.exports = router;