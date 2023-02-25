const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = asyncHandler;


// const asyncHandler = (fn) => (req, res, next) => {
//   return Promise.resolve(fn(req, res, next)).catch(next);
// };

// module.exports = asyncHandler;