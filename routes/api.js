const router = require("express").Router();
const apiPresupuestosRouter = require("./api/presupuestos.routes");
const apiUsuariosRouter = require("./api/users.routes");
router.use("/presupuestos", apiPresupuestosRouter);
router.use("/usuarios", apiUsuariosRouter);
module.exports = router;
