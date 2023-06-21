import {
  BUDGET,
  CATEGORY,
  DATE,
  DISTANCE,
  LOCATION,
  SUBCATEGORY,
  TOBEDONE,
  KEYWORDS,
} from './actionTypes';

export const setLocation = val => {
  return {
    type: LOCATION,
    payload: val,
  };
};

export const setDistance = val => {
  return {
    type: DISTANCE,
    payload: val,
  };
};

export const setCategory = val => {
  return {
    type: CATEGORY,
    payload: val,
  };
};

export const setSubCategory = val => {
  return {
    type: SUBCATEGORY,
    payload: val,
  };
};

export const setToBeDone = val => {
  return {
    type: TOBEDONE,
    payload: val,
  };
};

export const setBudget = val => {
  return {
    type: BUDGET,
    payload: val,
  };
};

export const setDate = val => {
  return {
    type: DATE,
    payload: val,
  };
};
export const setKeywords = val => {
  return {
    type: KEYWORDS,
    payload: val,
  };
};
