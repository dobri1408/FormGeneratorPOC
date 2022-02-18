import { addSyntheticTrailingComment } from "typescript";
import { siteSchema as initialState } from "../schemas/index";
import {
  ADD_NEW_PAGE,
  ADD_NEW_TAB,
  ADD_ELEMENT_TO_SYSTEM,
  ADD_ROW_TO_TABLE,
  UPDATE_TABLE,
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
    case UPDATE_TABLE:
      let newElementsArray = [...state.elements];
      let elementsIndexTable = newElementsArray.findIndex(
        (element) => element.id === action.payload.id
      );
      newElementsArray[elementsIndexTable] = action.payload.tableData;

      return {
        ...state,
        elements: newElementsArray,
      };
    default:
      return state;
  }
};
