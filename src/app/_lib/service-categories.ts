import "server-only";

import type { Category, SwellResponse } from "@/types/index";

import { getErrorMessage } from "@/utils/get-error-message";
import swell from "./server";

/*
  in case of an invalid PUT, POST, or DELETE request the Swell NODE library will return the SwellError type 
  for GET cases it will throw an Error. As a RULE OF THUMB, all Swell GET cases NEED to be wrapped in a try/catch block
*/

export const serviceCategories = async (): Promise<
  SwellResponse<Category> | { message: string }
> => {
  try {
    const res = await swell.get("/categories", {
      where: {
        active: true,
      },
    });
    return res;
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    }
    // this getErrorMessage is taken from an amazing Kent C Doods article, see the getErrorMessage reference function for more info
    const unknownError = getErrorMessage(err);
    return {
      message: unknownError,
    };
  }
};
