import { useMutation } from "@apollo/client";
import { unFollowUserMutation } from "./mutations.gql";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUnFollowUser() {
  
 
  const [unFollowUserEntryFunc,{loading}] = useMutation(unFollowUserMutation);

  const unFollowUserEntry = async (userName) => {
  
    const data = await unFollowUserEntryFunc({
      variables: {
        userName
      }
    });

    return data;
  };

  return [
    unFollowUserEntry,
    loading
  ];
}
