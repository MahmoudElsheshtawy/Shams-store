// import express from "express";
// import {
//   addProduct,
//   removeProduct,
//   singleProduct,
//   listProduct,
//   updatePrice,
//   electricalProducts,
// } from "../controllers/productController.js";
// import upload from "../middleware/multer.js";
// import adminAuth from "../middleware/adminAuth.js";

// const productRouter = express.Router();

// productRouter.post("/add",adminAuth,upload.fields([ { name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 } ]), addProduct);
// productRouter.post("/remove", adminAuth,removeProduct);
// productRouter.post("/single", singleProduct);
// productRouter.get("/list", listProduct);
// productRouter.put("/update-price", updatePrice);
// // add
// productRouter.get("/electrical", electricalProducts);
// export default productRouter;

import express from "express";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updatePrice,
  electricalProducts,
  ramadanProducts,
  eidProducts,
  addProductReview,
} from "../controllers/productController.js";
// import userAuth from "../middleware/auth.js"; // الميدل وير اللي يتحقق من تسجيل الدخول
import authUser from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.post("/remove", adminAuth, removeProduct);
router.post("/single", singleProduct);
router.get("/list", listProduct);
router.get("/electrical", electricalProducts);
router.put("/update-price", adminAuth, updatePrice);
router.get("/ramadan", ramadanProducts);
router.get("/eid", eidProducts);

router.post("/:id/review", authUser, addProductReview);
export default router;
