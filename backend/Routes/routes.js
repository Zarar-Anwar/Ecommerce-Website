import express from "express";
import controller from "../controller/controller.js";

const router=express.Router()


router.get('/product',controller.showData)

router.get('/products/:slug',controller.singleData)

router.get('/products/:id',controller.addCart)

router.get('/seed',controller.seed)

export default router