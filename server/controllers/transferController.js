const Account = require("../models/Account");

exports.depositAmount = async (req, res) => {
  //   const { fromAccountId, toAccountNumber, ifscCode, amount } = req.body;
  const { fromAccountId, toAccountNumber, ifscCode } = req.body;
  const amount = Number(req.body.amount);

  if (!fromAccountId || !toAccountNumber || !ifscCode || !amount) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const sender = await Account.findById(fromAccountId);
    const receiver = await Account.findOne({
      accountNumber: toAccountNumber,
      ifscCode: ifscCode,
    });

    if (!sender) {
      return res
        .status(404)
        .json({ success: false, message: "Sender account not found" });
    }

    if (!receiver) {
      return res
        .status(404)
        .json({ success: false, message: "Receiver account not found" });
    }

    if (sender._id.toString() === receiver._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Sender and Receiver cannot be same",
      });
    }

    if (sender.balance < amount) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // Perform transaction
    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    return res.json({ success: true, message: "Transfer successful" });
  } catch (error) {
    console.error("Transfer error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
