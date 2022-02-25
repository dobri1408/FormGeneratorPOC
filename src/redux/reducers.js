import { addSyntheticTrailingComment } from "typescript";
import { siteSchema as initialState } from "../schemas/index";
import {
  ADD_NEW_PAGE,
  ADD_NEW_TAB,
  ADD_ELEMENT_TO_SYSTEM,
  UPDATE_SCHEMA_TABLE,
  UPDATE_TABLE,
  UPDATE_FORM,
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
    case UPDATE_SCHEMA_TABLE:
      let elementsArray = [...state.elements];
      let indexOfTable = elementsArray.findIndex(
        (element) => element.id === action.payload.id
      );
      elementsArray[indexOfTable].schema = [...action.payload.schema];
      return {
        ...state,
        elements: elementsArray,
      };
    case UPDATE_FORM:
      let newElementsArray2 = [...state.elements];
      let elementsIndexForm = newElementsArray2.findIndex(
        (element) => element.id === action.payload.id
      );
      newElementsArray2[elementsIndexForm] = action.payload.form;
      return {
        ...state,
        elements: newElementsArray2,
      };
    default:
      return state;
  }
};
