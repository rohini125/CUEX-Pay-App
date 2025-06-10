import User from "../models/userModel.js";
import fs from "fs";
import path from "path";

// Get profile by userId
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error getting profile", error });
  }
};

// Upload profile image
export const uploadProfileImage = async (req, res) => {
  const { userId } = req.params;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old image if exists
    if (user.profileImage) {
      const oldPath = path.join("uploads", user.profileImage);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    user.profileImage = req.file.filename;
    await user.save();

    res.json({ message: "Profile image uploaded", profileImage: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: "Error uploading profile image", error });
  }
};

// Delete profile image
export const deleteProfileImage = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || !user.profileImage) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    const imagePath = path.join("uploads", user.profileImage);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    user.profileImage = null;
    await user.save();

    res.json({ message: "Profile image deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
};

// // Update profile info
// export const updateProfile = async (req, res) => {
//   const { userId } = req.params;
//   const {
//     name,
//     emailOrPhone,
//     upiId,
//     gender,
//     maritalStatus,
//     age,
//     dob,
//     familyMembers,
//   } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.name = name || user.name;
//     user.emailOrPhone = emailOrPhone || user.emailOrPhone;
//     user.upiId = upiId || user.upiId;
//     user.gender = gender || user.gender;
//     user.maritalStatus = maritalStatus || user.maritalStatus;
//     user.age = age || user.age;
//     user.dob = dob || user.dob;
//     user.familyMembers = familyMembers || user.familyMembers;

//     await user.save();

//     res.json({ message: "Profile updated successfully", user });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating profile", error });
//   }
// };
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    username,
    email,
    mobile,
    upiId,
    gender,
    maritalStatus,
    age,
    dob,
    familyMembers,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;
    user.mobile = mobile || user.mobile;
    user.upiId = upiId || user.upiId;
    user.gender = gender || user.gender;
    user.maritalStatus = maritalStatus || user.maritalStatus;
    user.age = age || user.age;
    user.dob = dob || user.dob;
    user.familyMembers = familyMembers || user.familyMembers;

    await user.save();
    console.log("update profile",user);
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Profile Update Error:", error); // helpful for debugging
    res.status(500).json({ message: "Error updating profile", error });
  }
};
