import { ADD_COMMENT, UPDATE_COMMENT } from "./../action/addCommentAction";

let initialState = {
  comment: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      const newComment = action.payload;
      return {
        ...state,
        comment: state.comment.concat(newComment),
      };

    case UPDATE_COMMENT:
      return {
        ...state,
      };
  }
  return state;
}
