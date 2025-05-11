const catchAsync = (controller) => {
    return (req, res, next) => {
      // console.log("Running controller:", controller);
      controller(req, res, next).catch(next);
    };
  };
  
  export default catchAsync;