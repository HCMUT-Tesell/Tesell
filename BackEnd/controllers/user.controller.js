import User from "../models/User.model.js"

export const createUser = async (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).json({
      success: false,
      message: "Please fully provide email and password",
    });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error("Error in CreateUser: ", error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
