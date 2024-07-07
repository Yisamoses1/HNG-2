const db = require("../Model");

exports.getUserOrganisations = async (req, res) => {
  try {
    const user = await db.User.findByPk(req.userId, {
      include: db.Organisation,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      status: "success",
      data: { organisations: user.Organisations },
    });
  } catch (error) {
    res
      .status(400)
      .json({
        message: "Error fetching organisations"
      });
  }
};

exports.getSingleOrganisation = async (req, res) => {
  try {
    const organisation = await db.Organisation.findOne({
      where: { orgId: req.params.orgId },
      include: db.User,
    });
    if (!organisation) {
      return res.status(404).json({ msg: "Organisation not found" });
    }
    res.status(200).json({ status: "success", data: organisation });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching organisation",
    });
  }
};

exports.createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const organisation = await db.Organisation.create({
      orgId: uuidv4(), // Generate a unique orgId using UUID
      name,
      description,
    });
    const user = await db.User.findByPk(req.userId);
    await user.addOrganisation(organisation);

    res.status(201).json({
      status: "success",
      message: "Organisation created successfully",
      data: organisation,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating organisation",
    });
  }
};

exports.addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  try {
    const organisation = await db.Organisation.findOne({
      where: { orgId: req.params.orgId },
    });
    const user = await db.User.findOne({ where: { userId } });

    if (!organisation || !user) {
      return res
        .status(404)
        .json({ msg: "Organisation or User not found" });
    }

    await organisation.addUser(user);

    res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error adding user to organisation",
    });
  }
};
