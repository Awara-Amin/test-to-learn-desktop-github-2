import express from "express";
import expressAsyncHandler from "express-async-handler";
import Coupon from "../models/couponModel.js";
import { isAuth, isSellerOrAdmin, isAdmin } from "../utils.js";

const couponRouter = express.Router();

// this get is to show the list of coupons we create in admin part
couponRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const coupon = await Coupon.find({}).sort({ createdAt: -1 });
    res.send(coupon);
  })
);

couponRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      res.send(coupon);
    } else {
      res.status(404).send({ message: "coupon Not Found" });
    }
  })
);

couponRouter.post(
  "/",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, expiry, discount } = req.body;
    console.log(name, expiry, discount);

    const coupon = new Coupon({
      name: "name " + Date.now(),
      expiry: Date.now(),
      discount: 12,
    });

    const createdCoupon = await coupon.save();
    res.send({ message: "New Coupon Created", coupon: createdCoupon });
  })
);
couponRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // try {
    const coupon = await Coupon.findById(req.params.id);
    if (coupon) {
      const deleteCoupon = await coupon.remove();
      res.send({ message: "Coupon Deleted", coupon: deleteCoupon });
    } else {
      res.status(404).send({ message: "Coupon Not Found" });
    }
    // } catch (err) {
    //   console.log(err);
    // }
  })
);

couponRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);
    // console.log(req.body.name);
    // console.log(req.body.expiry);

    if (coupon) {
      coupon.name = req.body.name;
      coupon.expiry = req.body.expiry;
      coupon.discount = req.body.discount;

      const updatedCoupon = await coupon.save();
      res.send({ message: "Coupon Updated kaka", coupon: updatedCoupon });
    } else {
      res.status(404).send({ message: "Coupon Not Found" });
    }
  })
);

export default couponRouter;
