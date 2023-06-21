import {
  LOCATION,
  DISTANCE,
  CATEGORY,
  SUBCATEGORY,
  TOBEDONE,
  BUDGET,
  DATE,
  KEYWORDS,
} from './../actions/actionTypes';

const initialState = {
  location: 'supu',
  distance: 0,
  category: '0',
  subCategory: '0',
  toBeDone: '3',
  budget: [0, 100],
  date: new Date(),
  keywords: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case DISTANCE:
      return {
        ...state,
        distance: action.payload,
      };
    case CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SUBCATEGORY:
      return {
        ...state,
        subCategory: action.payload,
      };
    case TOBEDONE:
      return {
        ...state,
        toBeDone: action.payload,
      };
    case BUDGET:
      return {
        ...state,
        budget: action.payload,
      };
    case DATE:
      return {
        ...state,
        date: action.payload,
      };
    case KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
      };
    default:
      return state;
  }
};
