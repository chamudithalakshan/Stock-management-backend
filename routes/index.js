var express = require('express');
var router = express.Router();
const ProductRoute = require("../controllers/ProductController");
const CategoryRoute = require("../controllers/CategoryController");
const UserRoute = require("../controllers/UserController");
const IssueProductRoute = require("../controllers/IssueProductController");
const PurchaseOrderRoute = require("../controllers/PurchaseOrderController");
const db = require('../db/Db');

router.use('/products',ProductRoute);
router.use('/category',CategoryRoute);
router.use('/user',UserRoute);
router.use('/issueProduct',IssueProductRoute);
router.use('/purchaseOrder',PurchaseOrderRoute);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
