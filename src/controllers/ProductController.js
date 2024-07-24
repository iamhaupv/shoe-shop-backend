const { bucketName, s3 } = require("../config/aws.config");
const { ProductRepository } = require("../repositories/index");

const path = require('path');
// create product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
      size,
      flashSale
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const imageURLs = [];

    // Loop through each file and upload to S3
    for (const file of req.files) {
      const fileType = path.extname(file.originalname).toLowerCase();
      const filePath = `${Date.now().toString()}_${file.originalname}`; // Ensure unique file name

      const paramsS3 = {
        Bucket: bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      try {
        const data = await s3.upload(paramsS3).promise();
        imageURLs.push(data.Location);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading images" });
      }
    }

    // Log imageURLs to debug
    console.log('Image URLs:', imageURLs);

    // Add product with image URLs array
    const product = await ProductRepository.addProduct(
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
      size,
      imageURLs, // pass the array of image URLs
      flashSale
    );

    res.status(201).json({
      message: "Product added successfully!",
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot add product!",
    });
  }
};
// delete product by id
const deleteProductById = async (req, res) => {
  try {
    const _id = req.params;
    const product = await ProductRepository.deleteProductById(_id);
    res.status(200).json({
      message: "Delete product successfully!",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete product because ID not found",
    });
  }
};
// update product by _id
const updateProduct = async (req, res) => {
  try {
    const { _id } = req.params; // Lấy id sản phẩm cần cập nhật

    // Lấy thông tin sản phẩm từ body của request
    const {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
      size,
      images = [] // Danh sách các URL của product, mặc định là mảng rỗng
    } = req.body;

    let newImageURLs = []; // Mảng chứa các URL hình ảnh mới tải lên

    // Kiểm tra xem trong request có chứa file hình ảnh mới không
    if (req.files && req.files.length > 0) {
      // Upload new images to S3
      for (const file of req.files) {
        const fileType = path.extname(file.originalname).toLowerCase(); // Lấy loại file (ví dụ: .jpg, .png)
        const filePath = `${Date.now().toString()}_${file.originalname}`; // Tạo tên file đảm bảo duy nhất

        // Tham số để tải lên file lên Amazon S3
        const paramsS3 = {
          Bucket: bucketName, // Tên bucket S3
          Key: filePath, // Đường dẫn file trên S3
          Body: file.buffer, // Dữ liệu của file
          ContentType: file.mimetype, // Kiểu dữ liệu của file
        };

        // Thực hiện tải lên file lên S3
        try {
          const data = await s3.upload(paramsS3).promise(); // Tải lên và nhận dữ liệu trả về từ S3
          newImageURLs.push(data.Location); // Lưu trữ URL hình ảnh vào mảng imageURLs
        } catch (err) {
          console.error(err); // Xử lý lỗi nếu có
          return res.status(500).json({ message: "Error uploading images" }); // Trả về lỗi nếu tải lên không thành công
        }
      }
    }

    // Lấy thông tin sản phẩm hiện tại từ cơ sở dữ liệu để lấy danh sách các URL hình ảnh cũ
    const existingProduct = await ProductRepository.findProductById(_id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingImageURLs = existingProduct.images || [];

    // Tạo mảng để lưu các URL hình ảnh sau khi cập nhật
    let updatedImageURLs;

    if (newImageURLs.length > 0) {
      // Nếu có ảnh mới, xóa tất cả ảnh cũ và chỉ sử dụng ảnh mới
      for (const existingImageUrl of existingImageURLs) {
        try {
          const key = existingImageUrl.split("/").pop(); // Lấy tên file từ URL
          const paramsS3 = {
            Bucket: bucketName, // Tên bucket S3
            Key: key, // Tên file trên S3
          };
          await s3.deleteObject(paramsS3).promise(); // Xóa file trên S3
        } catch (err) {
          console.error("Error deleting image from S3:", err);
          // Xử lý lỗi xóa file nếu có
        }
      }
      updatedImageURLs = newImageURLs;
    } else {
      // Nếu không có ảnh mới, chỉ giữ lại ảnh có trong danh sách images, xóa các ảnh cũ không có trong danh sách này
      for (const existingImageUrl of existingImageURLs) {
        if (!images.includes(existingImageUrl)) {
          try {
            const key = existingImageUrl.split("/").pop(); // Lấy tên file từ URL
            const paramsS3 = {
              Bucket: bucketName, // Tên bucket S3
              Key: key, // Tên file trên S3
            };
            await s3.deleteObject(paramsS3).promise(); // Xóa file trên S3
          } catch (err) {
            console.error("Error deleting image from S3:", err);
            // Xử lý lỗi xóa file nếu có
          }
        }
      }
      updatedImageURLs = images;
    }

    // Tạo đối tượng cập nhật thông tin sản phẩm
    const productUpdate = {
      name,
      quantity,
      category,
      price,
      description,
      color,
      material,
      design,
      size,
      images: updatedImageURLs, // Cập nhật danh sách hình ảnh mới
    };

    // Gọi hàm cập nhật sản phẩm từ ProductRepository
    const updatedProduct = await ProductRepository.updateProduct(_id, productUpdate, { new: true });

    // Trả về thông báo thành công và dữ liệu sản phẩm đã cập nhật
    res.status(200).json({
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error); // Log lỗi nếu có
    res.status(500).json({
      message: "Cannot update product!", // Trả về thông báo lỗi nếu không thể cập nhật sản phẩm
      error: error.message,
    });
  }
};
// find product by id
const findProductById = async (req, res) => {
  try {
    const { _id } = req.body;
    const product = await ProductRepository.findProductById(_id);
    if (product == null) {
      throw new Error("Not found product by id!");
    }
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot found product by id!",
    });
  }
};
// find all product
const findAllProduct = async (req, res) => {
  try {
    const products = await ProductRepository.findAllProduct();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "null!",
    });
  }
};
// find all product by category
const findAllProuctByCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const products = await ProductRepository.findAllProuctByCategory(
      categoryId
    );
    res.status(200).json({
      message: "Successfully!",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Null!",
    });
  }
};
// upload images
const uploadImages = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const image = req.file.originalname.split(".");
    const fileType = image[image.length - 1];
    const filePath = `${Date.now().toString()}.${fileType}`; // Bạn có thể thêm studentId nếu cần thiết

    const paramsS3 = {
      Bucket: bucketName,
      Key: filePath,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    s3.upload(paramsS3, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error uploading image" });
      }
      const imageURL = data.Location; // URL của hình ảnh sau khi được upload lên S3
      res.status(200).json({
        message: "Image uploaded successfully!",
        imageURL,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error!");
  }
};
// find all product flash sale
const findAllProductFlashSale = async (req, res) => {
  try {
    const product = await ProductRepository.findAllProductFlashSale()
    res.status(200).json({
      message: "Successfully",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
// find all product free ship
const findAllProductFreeShip = async (req, res) => {
  try {
    const product = await ProductRepository.findAllProductFreeShip()
    res.status(200).json({
      message: "Successfully",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
// find all product is discount
const findAllProductIsDiscount = async(req, res) => {
  try {
    const product = await ProductRepository.findAllProductIsDiscount()
    res.status(200).json({
      message: "Successfully",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
// find all product shop mall
const findAllProductShopMall = async (req, res) => {
  try {
    const product = await ProductRepository.findAllProductShopMall()
    res.status(200).json({
      message: "Successfully",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
// find all product love and discount
const findAllProductLoveAndDiscount = async (req, res) => {
  try {
    const products = await ProductRepository.findAllProductLoveAndDiscount()
    res.status(200).json({
      message: "Successfully!",
      data: products
    })
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}
module.exports = {
  addProduct,
  deleteProductById,
  updateProduct,
  findProductById,
  findAllProduct,
  findAllProuctByCategory,
  uploadImages,
  findAllProductFlashSale,
  findAllProductFreeShip,
  findAllProductIsDiscount,
  findAllProductShopMall,
  findAllProductLoveAndDiscount
};
