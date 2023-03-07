import graphQLRequest from "staticUtils/graphQLRequest";
import profileInfoQuery from "./profileInfo.js";

/**
 * Fetch a product by its slug or id
 *
 * @param {String} slugOrId - The slug or id of the product to fetch
 * @returns {Object} product - the fetched product
 */
export default async function fetchProfileInfo(slugOrId) {
 
  if (!slugOrId) return { profile: {} };

  const data = await graphQLRequest(profileInfoQuery, {
    userName: slugOrId
  });

  return data && data.getUserByuserName && { profile: data.getUserByuserName };
}
