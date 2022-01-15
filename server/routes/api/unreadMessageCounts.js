const router = require("express").Router();

const { UnreadMessageCounts } = require("../../db/models");

router.patch("/", async (req, res, next) => {
  /**
   * sample body {conversationId, senderId}
   */
  if (!req.user) {
    return res.sendStatus(401);
  }
  try {
    const { conversationId, senderId } = req.body;
    let resp = await UnreadMessageCounts.update(
      { count: 0 },
      { where: { conversationId, senderId } }
    );
    res.send({ updated: !!resp[0] });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
