import { useMutation } from "@apollo/client";
import { updatePayoutMutation } from "./mutations.gql";
import useViewer from "hooks/viewer/useViewer";
/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useAddPayout() {
  const [viewer, , refetchViewer] = useViewer();
 
  const [addPayoutEntryFunc,{loading}] = useMutation(updatePayoutMutation, {
    onCompleted() {
      refetchViewer();
    }
  });

  const addPayoutEntry = async (AccountNo,AccountTitle,swiftCode,AccountId,isCardActive) => {
  
    const data = await addPayoutEntryFunc({
      variables: {
        input: {
          AccountNo,
          AccountTitle,
          swiftCode,
          AccountId,
          isActive:isCardActive
        }
      }
    });

    return data;
  };

  return [
    addPayoutEntry,
    loading
  ];
}
