class AppError extends Error {
  constructor(message, statusCode, status) {
    super(message);

    (this.statusCode = statusCode || 401),
      (this.message = message),
      (this.status = status || "FAILED");
    this.isOperational = true;
  }
}

module.exports = AppError;
