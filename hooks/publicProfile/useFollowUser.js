import { useMutation } from "@apollo/client";
import { followUserMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useFollowUser() {
  
 
  const [followUserEntryFunc,{loading}] = useMutation(followUserMutation);

  const followUserEntry = async (userName) => {
  
    const data = await followUserEntryFunc({
      variables: {
        userName
      }
    });

    return data;
  };

  return [
    followUserEntry,
    loading
  ];
}
