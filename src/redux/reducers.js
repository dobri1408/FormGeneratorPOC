import { addSyntheticTrailingComment } from "typescript";
import { siteSchema as initialState } from "../schemas/index";
import {
  ADD_NEW_PAGE,
  ADD_NEW_TAB,
  ADD_ELEMENT_TO_SYSTEM,
  ADD_ROW_TO_TABLE,
} from "./constants";
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PAGE:
      return {
        ...state,
        [action.payload.country]: [
          ...state[action.payload.country],
          action.payload.newPage,
        ],
      };

    case ADD_NEW_TAB:
      return {
        ...state,
        [action.payload.country]: action.payload.pages,
      };
    case ADD_ELEMENT_TO_SYSTEM:
      return {
        ...state,
        elements: [...state.elements, action.payload],
      };
    case ADD_ROW_TO_TABLE:
      return {
        ...state,
        elements: action.payload,
      };
    default:
      return state;
  }
};
