const express = require("express");
const db = require('../models');
const router = express.Router();
const expressAsyncHandler =  require('express-async-handler');
const data1 = require("../data1");
const productController = require('../controllers/productController');
const { isAdmin, isAuth} = require('../utlis');
const { route } = require("./uploadRouter");
const Sequelize = require('sequelize');
const data = require("../data");
const Op = Sequelize.Op;



router.get("/categories", 
expressAsyncHandler(async (req, res) => {
    const categories = await db.categories.findAll();
    res.send(categories);

}));
router.get("/brands", 
expressAsyncHandler(async (req, res) => {
    const brands = await db.brands.findAll();
    res.send(brands);

}));

router.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await db.products.findOne({
            where:{
                idProduct: req.params.id
            }
        })
        if (product) {
        const deleteProduct = await product.destroy();
        res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
        res.status(404).send({ message: 'Product Not Found' });
        }
  })
);

router.post("/",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const createdProduct = await db.products.create({
            productName: req.body.name,
            productPrice: req.body.price,
            productDescription:"ss",
            quantityInStock: req.body.quantityInStock,
            idBrand: req.body.brand,
            idCategory: req.body.category,
        });
        const createdetail = await db.productdetail.create({
            idProduct: createdProduct.idProduct,
            image: req.body.image,
        })
        const products = await db.products.findOne({
            where: {
                idProduct: createdProduct.idProduct
            },
            include:{
                model: db.categories,
            }
        })
        if (products.category.categoryName.search("Giày") !== -1) {
            const array = data.sizeShoes;
            array.forEach(async(element) => {
                await db.productsizes.create({
                    idProduct: createdProduct.idProduct,
                    idSize: element.idSize,
                    quantityInStock: element.quantityInStock,
                    productSize: element.productSize,
            })
         }) 
        }
        else {
            const array = data.sizeShirt;
            array.forEach(async(element) => {
                await db.productsizes.create({
                    idProduct: createdProduct.idProduct,
                    idSize: element.idSize,
                    quantityInStock: element.quantityInStock,
                    productSize: element.productSize,
            })
         })
        }
        console.log(products.category.categoryName); 
        res.send({ message: 'Product Created', product: createdProduct });
    }
));
router.post("/category",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const createdCategory = await db.categories.create({
            categoryName: req.body.nameCategory,
        });
        res.send({ message: 'Category create', category: createdCategory });
    }
));
router.delete(
    '/category/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const category = await db.categories.findOne({
            where:{
                idCategory: req.params.id
            }
        })
        if (category) {
        const deleteCategory = await category.destroy();
        res.send({ message: 'Category Deleted', category: deleteCategory });
        } else {
        res.status(404).send({ message: 'Category Not Found' });
        }
  })
);

router.put(
    '/category/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const category = await db.categories.findOne({
            where:{
                idCategory: req.params.id
            }
        })
        if (category) {
            category.categoryName = req.body.name;
            updateCategory = category.save();
            res.send({ message: 'Category Update', category: updateCategory});
        } else {
        res.status(404).send({ message: 'Category Not Found' });
        }
  })
);

router.get(
    '/category/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const category = await db.categories.findOne({
            where:{
                idCategory: req.params.id
            }
        })
        if (category) {
            res.send(category);
        } else {
        res.status(404).send({ message: 'Category Not Found' });
        }
  })
);


router.post("/brand",
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const createdBrand = await db.brands.create({
            brandName: req.body.nameBrand,
        });
        res.send({ message: 'Brand create', category: createdBrand });
    }
));
router.delete(
    '/brand/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const brand = await db.brands.findOne({
            where:{
                idBrand: req.params.id
            }
        })
        if (brand) {
        const deleteBrand = await brand.destroy();
        res.send({ message: 'Brand Deleted', brand: deleteBrand });
        } else {
        res.status(404).send({ message: 'Brand Not Found' });
        }
  })
);
router.get(
    '/brand/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const brand = await db.brands.findOne({
            where:{
                idBrand: req.params.id
            }
        })
        if (brand) {
            res.send(brand);
        } else {
            res.status(404).send({ message: 'Brand Not Found' });
        }
  })
);
router.put(
    '/brand/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const brand = await db.brands.findOne({
            where:{
                idBrand: req.params.id
            }
        })
        if (brand) {
            brand.brandName = req.body.name;
            updateBrand = brand.save();
            res.send({ message: 'Brand Update', brand: updateBrand });
        } else {
            res.status(404).send({ message: 'Brand Not Found' });
        }
  })
);

router.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) =>{
        const productId = req.params.id;
        const product = await db.products.findOne({
            where:{
                idProduct: productId
            }
        })
        const productImage = await db.productdetail.findOne({
            where:[{
                idProduct: productId,
                idImage: 1
            }],
        })
        const productSize = await db.productsizes.findOne({
            where:[{
                idProduct: productId,
                idSize: req.body.size,
            }]
        })
        if (product) {
            product.productName = req.body.name;
            product.productPrice = req.body.price;
            product.productDescription = req.body.description;
            product.idBrand = req.body.brand;
            product.idCategory = req.body.category;
            await product.save();
        } 
        
        if (productImage) {
            productImage.image = req.body.image;
            await productImage.save();
        }
        const count = req.body.qty;
        const quantity = parseInt(count)
        if (productSize) {
            productSize.quantityInStock = quantity;
            await productSize.save();
        }
        if(product){
        res.send({ message: 'Product Updated'});}
        else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })

);

router.get("/test",
    expressAsyncHandler(async (req, res) => {
        const min = req.query.min;
        const minPrice = parseInt(min);
        const max = req.query.max;
        const maxPrice = parseInt(max);
        const priceFilter = min && max ? [min,max] : [1,50000000];
        const product = await db.products.findOne({
            where:{
                idProduct: req.query.id
            },
            include: {
                model: db.categories,
            }
        })
        const check = product.category.categoryName.search("Áo")
        res.send({check});
    }));
   

    router.get("/import",
    expressAsyncHandler(async (req, res) => {
        const array = data1.products;
        await array.forEach(async(product) => {
            await db.products.create({
                idProduct: product.idProduct,
                productName: product.productName,
                productPrice: product.productPrice,
                productDescription: product.productDescription,
                idBrand: product.idBrand,
                idCategory: product.idCategory,
            })
            if (product.idCategory == 1 || product.idCategory == 2) {
            data.sizeShoes.forEach(async(size) => {
                   await db.productsizes.create({
                      idProduct:  product.idProduct,
                      idSize: size.idSize,
                      quantityInStock: size.quantityInStock,
                      productSize: size.productSize,
                   })
               })
            }
            else {
            data.sizeShirt.forEach(async(size) => {
                    await db.productsizes.create({
                       idProduct:  product.idProduct,
                       idSize: size.idSize,
                       quantityInStock: size.quantityInStock,
                       productSize: size.productSize,
                    })  
                })
            }
        }
        )
        res.send("Thành công"); 
    }
));    
router.get("/importimage", expressAsyncHandler(async (req, res) => {
    await db.productdetail.bulkCreate(data1.productdetail);
    res.send("Thành công"); 
 }));

router.get("/plt",
 isAuth,
 isAdmin,
 expressAsyncHandler(async (req, res) => {
   const count = await db.products.findAll({
     include:[{
       model: db.categories,
     }],
     attributes: ['category.categoryName', [Sequelize.fn('COUNT', Sequelize.col('products.idProduct')), 'countProduct']],
     group:["products.idCategory"], 

   })
   res.send(count);
}
));

router.get('/', productController.products);
router.get("/seed", productController.postProducts);    
router.get('/:id',productController.productdetail);






module.exports = router;