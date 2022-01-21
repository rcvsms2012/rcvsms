const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


//Create Product
exports.createProduct  = catchAsyncErrors(async(req,res,next)=>{
   const product = await Product.create(req.body);

        res.status(201).json({
         sucess:true,
         product
        });

});
// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});


 // Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});


//Update product ---admin
exports.updateProduct   = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findId(req.params.Id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
    
    product = await product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      usefindAndModify:false
    });
    res.status(200).json({
      sucess:true,
      product
    });

    });
 //Delete Product
 exports.deleteProduct  = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  
    await product.remove();
    res.status(200).json({
      sucess:true,
      massage:"Product Delete Successfully"
    });
 
});

