import express from "express";
import controller from "../controller/controller.js";
import { isAuth } from "../utils.js";

const router=express.Router()

router.get('/product',controller.showData)

router.get('/products/:slug',controller.singleData)

router.get('/product/:id',controller.addCart)

router.get('/seed',controller.seed)

router.post('/userLogin',controller.userLogin)

router.post('/userReg',controller.userReg)

router.post('/order',isAuth,controller.order)

router.get('/order/mine',isAuth,controller.orderMine)

router.get('/order/:id',isAuth,controller.orderget)

router.get('/keys/paypal',controller.paypal)

router.put('/order/:id/pay',isAuth,controller.idPay)

router.put('/user/profile',isAuth,controller.userProfile)

router.get('/categories',controller.categories)

router.get('/search',controller.search)

export default router