/* eslint-disable camelcase */
import {
  type DeletedSwelAccount,
  type SwellAccount,
  type SwellError,
  type UpdatedSwellAccount,
} from "@/types/index";
import "server-only";

import swell from "./server";

/*
TODO: What are the actual mandatory fields for creating a Swell account for the function createSwellBuyer?
!Make sure we define this
*/
export const createSwellBuyer = async (
  id: string,
  email: string,
  firstName: string | null,
  lastName: string | null
): Promise<SwellAccount | SwellError> => {
  return await swell.post("/accounts", {
    clerk_id: id,
    email,
    first_name: firstName ?? "",
    last_name: lastName ?? "",
    email_optin: false,
    group: "originotes_buyers",
  });
};

export const updateSwellBuyer = async (
  email: string,
  first_name: string | null,
  last_name: string | null
): Promise<UpdatedSwellAccount | SwellError> => {
  return await swell.put("/accounts/{id}", {
    email,
    first_name: first_name ?? "",
    last_name: last_name ?? "",
    group: "originotes_buyers",
  });
};

export const deleteSwellBuyer = async (
  id: string | undefined
): Promise<DeletedSwelAccount | SwellError> => {
  if (!id)
    throw new Error(
      "No clerk id provided. Please ensure there is a clerk id provided to Swell."
    );
  const currentUser = await await swell.get("/accounts/", {
    clerk_id: id,
  });

  const { results, count } = currentUser;

  if (count === 1 && Array.isArray(results) && results.length > 0) {
    return await swell.delete("/accounts/{id}", {
      id: results[0].id,
    });
  } else {
    throw new Error("No user found with the clerk id provided");
  }
};
