import Router from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controller/categoryController.js';
import {
  createStock,
  getStock,
  updateStock,
  deleteStock
} from '../controller/Stock.js';
const router = Router();
import {
  createVariation,
  getVariations,
  getVariationById,
  updateVariation,
  deleteVariation
} from '../controller/Variation.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controller/productController.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *     Stock:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         productId:
 *           type: string
 *         variationId:
 *           type: string
 *         quantity:
 *           type: integer
 *           format: int32
 *         location:
 *           type: string
 *     Variation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         productId:
 *           type: string
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *           format: float
 *         categoryId:
 *           type: string
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     description: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category successfully created
 *       400:
 *         description: Invalid request
 */
router.post('/categories/create', createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Get all categories
 *     responses:
 *       200:
 *         description: List of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/categories', getCategories);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   get:
 *     description: Get a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 */
router.get('/categories/:categoryId', getCategoryById);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   put:
 *     description: Update a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 */
router.put('/categories/:categoryId', updateCategory);

/**
 * @swagger
 * /api/categories/{categoryId}:
 *   delete:
 *     description: Delete a category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         description: ID of the category to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/categories/:categoryId', deleteCategory);


/**
 * @swagger
 * /api/stocks:
 *   post:
 *     description: Create a new stock record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Stock record successfully created
 *       400:
 *         description: Invalid request
 */
router.post('/stocks/create', createStock);

/**
 * @swagger
 * /api/stocks/{productId}/{variationId}:
 *   get:
 *     description: Get stock for a specific product variation
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *       - in: path
 *         name: variationId
 *         required: true
 *         description: ID of the product variation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock information found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 *       404:
 *         description: Stock not found for the specified product and variation
 */
router.get('/stocks/:productId/:variationId', getStock);

/**
 * @swagger
 * /api/stocks/{stockId}:
 *   put:
 *     description: Update stock quantity
 *     parameters:
 *       - in: path
 *         name: stockId
 *         required: true
 *         description: ID of the stock record to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Stock record not found
 */
router.put('/stocks/:stockId', updateStock);

/**
 * @swagger
 * /api/stocks/{stockId}:
 *   delete:
 *     description: Delete a stock record
 *     parameters:
 *       - in: path
 *         name: stockId
 *         required: true
 *         description: ID of the stock record to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock record deleted successfully
 *       404:
 *         description: Stock record not found
 */
router.delete('/stocks/:stockId', deleteStock);


/**
 * @swagger
 * /api/variations:
 *   post:
 *     description: Create a new variation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variation'
 *     responses:
 *       201:
 *         description: Variation successfully created
 *       400:
 *         description: Invalid request
 */
router.post('/variations/create', createVariation);

/**
 * @swagger
 * /api/variations:
 *   get:
 *     description: Get all variations
 *     responses:
 *       200:
 *         description: List of all variations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variation'
 */
router.get('/variations', getVariations);

/**
 * @swagger
 * /api/variations/{variationId}:
 *   get:
 *     description: Get a variation by ID
 *     parameters:
 *       - in: path
 *         name: variationId
 *         required: true
 *         description: ID of the variation to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variation'
 *       404:
 *         description: Variation not found
 */
router.get('/variations/:variationId', getVariationById);

/**
 * @swagger
 * /api/variations/{variationId}:
 *   put:
 *     description: Update a variation by ID
 *     parameters:
 *       - in: path
 *         name: variationId
 *         required: true
 *         description: ID of the variation to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variation'
 *     responses:
 *       200:
 *         description: Variation updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Variation not found
 */
router.put('/variations/:variationId', updateVariation);

/**
 * @swagger
 * /api/variations/{variationId}:
 *   delete:
 *     description: Delete a variation by ID
 *     parameters:
 *       - in: path
 *         name: variationId
 *         required: true
 *         description: ID of the variation to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Variation deleted successfully
 *       404:
 *         description: Variation not found
 */
router.delete('/variations/:variationId', deleteVariation);


/**
 * @swagger
 * /api/products:
 *   post:
 *     description: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product successfully created
 *       400:
 *         description: Invalid request
 */
router.post('/products/create', createProduct);

/**
 * @swagger
 * /api/products:
 *   get:
 *     description: Get all products
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getProducts);

/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     description: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get('/products/:productId', getProductById);

/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     description: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put('/products/:productId', updateProduct);

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     description: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/products/:productId', deleteProduct);

export default router;
