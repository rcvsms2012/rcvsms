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
        })

}
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


 //Get all products ---admin
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
  const Products = await Product.find();
  res.status(200).json({
    sucess:true,
    Products
})
}
//Update product ---admin
exports.updateProduct   = catchAsyncErrors(async(req,res,next)=>{
  let product = await Product.findId(req.params.Id);
    if(!product){

      return res.status(500).json({
        sucess:true,
        massage:"Product not found"
       
      })
    }
    product = await product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true,
      usefindAndModify:false
    });
    res.status(200).json({
      sucess:true,
      product
    })

    }
 //Delete Product
 exports.deleteProduct  = catchAsyncErrors(async(req,res,next)=>{
  const product = await Product.findById(req.params.id);

  if(!product){

    return res.status(500).json({
      sucess:true,
      massage:"Product not found"
     
    })
  }
    await product.remove();
    res.status(200).json({
      sucess:true,
      massage:"Product Delete Successfully"
    })
 
}

