const express = require("express");
const {
  getUserOrganisations,
  getSingleOrganisation,
  createOrganisation,
  addUserToOrganisation,
} = require("../controller/organisationController");
const {authenticate } = require("../Middleware/auth");

const router = express.Router();

router.get("/", authenticate, getUserOrganisations);
router.get("/:orgId",authenticate, getSingleOrganisation);
router.post("/", authenticate, createOrganisation);

router.post("/:orgId/users", authenticate, addUserToOrganisation);

module.exports = router;
