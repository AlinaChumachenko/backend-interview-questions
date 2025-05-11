// const errorHandler = (err, req, res, next) => {
//     const { status = 500, message = "Internal Server Error" } = err;
  
//     res.status(status).json({
//       status: "error",
//       code: status,
//       message,
//     });
//   };
  
//   export default errorHandler;
  

  const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
      return next(err); 
    }
  
    console.error(err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
  };
  
  export default errorHandler;