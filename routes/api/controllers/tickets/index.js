const express = require("express");
const { authenticate, authorize } = require("../../../../middlewares/auth");
const ticketController = require("./ticket.controller");
const router = express.Router();

//* create router
router.post(
  "/",
  authenticate,
  authorize(["client"]),
  ticketController.createTicket
);
// router.post("/", ticketController.posttickets);
// router.get("/:id", ticketController.getticketsById);
// router.put("/:id", ticketController.putticketsById);
// router.patch("/:id", ticketController.patchticketsById);
// router.delete("/:id", ticketController.deleteticketsById);

module.exports = router;
