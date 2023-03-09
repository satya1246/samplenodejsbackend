exports.gethealth = async (req, res, next) => {
  try {
    res.send("ok");
    next();
  } catch (error) {
    next(error);
  }
};
