import express from "express";
import controller from "../controller/controller.js";

const router=express.Router()


router.get('/product',controller.showData)

router.get('/product/:slug',controller.singleData)

router.get('/product/:id',controller.addCart)

export default router