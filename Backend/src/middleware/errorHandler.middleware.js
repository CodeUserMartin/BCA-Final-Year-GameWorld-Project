const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        // Include stack only if you want during development
        // ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};


export { errorHandler };