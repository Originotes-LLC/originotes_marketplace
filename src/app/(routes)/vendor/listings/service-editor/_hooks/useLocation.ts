import { useSearchBoxCore } from "@mapbox/search-js-react";

export const useLocation = async () => {
  const searchBoxCore = useSearchBoxCore({
    accessToken: process.env.ACCESS_TOKEN,
  });
  const response = await searchBoxCore.suggest("1600 pennsylvania ave nw", {
    sessionToken: "test-123",
  });
  console.log(`response from mapbox`, response);
  // { suggestions: [...], attribution: '...', url: '...' };

  return {
    searchBoxCore,
    response,
  };
};
