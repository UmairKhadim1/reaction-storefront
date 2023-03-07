import { useMutation } from "@apollo/client";
import useViewer from "hooks/viewer/useViewer";
import { updateProfileMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useProfile() {
  const [viewer, , refetchViewer] = useViewer();
  const [updateProfileEntryFunc, { loading }] = useMutation(updateProfileMutation);

  const updateProfileEntry = async (name,firstName,lastName,picture,username) => {
  
    const data = await updateProfileEntryFunc({
      variables: {
        input: {
          name,
          firstName,
          lastName,
          picture,
          username
        }
      }
    });
   
    return data;
  };

  return [
    updateProfileEntry,
    loading
  ];
}
