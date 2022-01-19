const router = require("express").Router();

const { Op } = require("sequelize");
const { UnreadMessageCounts } = require("../../db/models");

router.patch("/", async (req, res, next) => {
  /**
   * sample body {conversationId, senderId}
   */
  if (!req.user) {
    return res.sendStatus(401);
  }
  const { conversationId, senderId } = req.body;
  try {
    const count = await UnreadMessageCounts.count({
      where: {
        conversationId,
        [Op.or]: { senderId: req.user.id, recipientId: req.user.id },
      },
    });
    if (!count) {
      return res.status(403).json({ error: "Unauthorized Error" });
    }
    await UnreadMessageCounts.update(
      { count: 0 },
      { where: { conversationId, senderId } }
    );
    res.send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
