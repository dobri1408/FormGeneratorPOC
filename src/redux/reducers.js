import { siteSchema as initialState } from "../schemas/index";
import { ADD_NEW_PAGE, ADD_NEW_TAB } from "./constants";
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAGE:
      return {
        ...state,
        [action.payload.country]: [
          ...state[action.payload.country],
          action.payload.newPage
        ]
      };

    case ADD_NEW_TAB:
      return {
        ...state,
        [action.payload.country]: action.payload.pages
      };
    default:
      return state;
  }
};
