module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next)
      .then(() => "hit catchAsync📞")
      .catch((err) => next(err));
  };
};
