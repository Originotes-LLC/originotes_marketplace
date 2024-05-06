import "server-only";

import { getErrorMessage } from "@/utils/get-error-message";
import swell from "./server";

interface Category {
  name: string;
  active: boolean;
  sorting: null;
  images: null;
  description: string;
  meta_title: null;
  meta_description: null;
  parent_id: null;
  slug: string;
  top_id: null;
  date_created: string;
  id: string;
}

interface CategoryList {
  count: number;
  page_count: number;
  page: number;
  results: Category[];
}

/*
  in case of an invalid PUT, POST, or DELETE request the Swell NODE library will return the SwellError type 
  for GET cases it will throw an Error. As a RULE OF THUMB, all Swell GET cases NEED to be wrapped in a try/catch block
*/

export const serviceCategories = async (): Promise<
  CategoryList | { message: string }
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
