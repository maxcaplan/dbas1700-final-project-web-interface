/**
 * Route guard that ensures there is a valid database connection
 */
export default function validateDbConnection (req, res, next) {
  if (!req.app.locals.db || !req.app.locals.db.connected) {
    res.status(500);
    throw new Error("DATABASE CONNECTION ERROR");
  }

  next();
};
