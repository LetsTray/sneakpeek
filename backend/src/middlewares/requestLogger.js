// Custom request logger middleware
export const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next(); // Proceed to the next middleware or route handler
};
