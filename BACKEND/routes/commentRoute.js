const express = require("express");
const commentController = require("../controller/commentController");

const router = express.Router({ mergeParams: true });

router.route("/").get(commentController.allComment);
router.get("/newComments", commentController.getNewComment);

router
  .route("/wholesaler")
  .post(
    commentController.getUserId,
    commentController.getReqBodyWRComment,
    commentController.createWRComment
  )
  .get(
    commentController.getUserId,
    commentController.getReqBodyWRComment,
    commentController.getWRComment
  )
  .patch(
    commentController.getUserId,
    commentController.getReqBodyWRComment,
    commentController.updateWRComment
  )
  .delete(
    commentController.getUserId,
    commentController.getReqBodyWRComment,
    commentController.deleteWRComment
  );

module.exports = router;
