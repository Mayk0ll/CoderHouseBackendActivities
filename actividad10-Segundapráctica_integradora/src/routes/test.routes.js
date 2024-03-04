import { Router } from "express";

const router = Router();

//cookies
router.get("/setCookie", (req, res) => {
    res.cookie("withKey", {nombre: 'michael', rol: [1,3,6]}, {maxAge: 10000}).send({data: "Cookie seteada"});
});

router.get("/getCookies", (req, res) => {
    res.send({status: "Cookies obtenidas", data: req.cookies});
});

router.get("/deleteCookie", (req, res) => {
    res.clearCookie("withKey").send({status: "Cookie eliminada"});
});



//sesions

export default router;