const userModel = require("../users/users-model")

function logger(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  let reqMethod = req.method;
  let reqURL = req.orginalUrl;
  let timeStamp = new Date().toLocaleString();
  console.log(`${timeStamp}-${reqMethod}-${reqURL}`);
  next();
}

async function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let existUser = await userModel.getById(req.params.id);
    if (!existUser) {
      res.status(404).json({ message: "user not found" });

    } else {
      req.currentUser = existUser;
      next();
    }

  } catch (error) {
    next(error);
  }
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let { name } = req.body;
    if (!name) {
      res.status(400).json({ message: "gerekli name alanı eksik" })

    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  try {
    let text = req.body.text;
    if (!text) {
      res.status(400).json({ message: "gerekli text alanı eksik" });

    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
// bu işlevleri diğer modüllere değdirmeyi unutmayın
module.exports = {
  validateUserId,
  validatePost,
  validateUser,
  logger
}