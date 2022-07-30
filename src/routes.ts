import { Router, Request, Response } from "express";
import multer from "multer";

// user controllers
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// category controllers
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";


// product controllers
import { CreateProductControler } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

// order controllers
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { DeleteOrderController } from "./controllers/order/DeleteOrderController";
import { AddItemController } from "./controllers/order/AddItemController";
import { DeleteItemController } from "./controllers/order/DeleteItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrdersController } from './controllers/order/ListOrdersController';
import { DetailOrderController } from "./controllers/order/DetailOrderControler";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

//authentications
import { isAuthenticated } from './middlewares/isAuthenticated';


import uploadConfig from './config/multer';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

// --  Rotas User  --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- Rotas Category --
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

// -- Rotas Product --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductControler().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

// -- Rotas Order --
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new DeleteOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new DeleteItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)


export { router };