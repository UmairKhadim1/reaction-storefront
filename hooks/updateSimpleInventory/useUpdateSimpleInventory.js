import { useMutation } from "@apollo/client";
import { updateSimpleInventoryMutation } from "./mutations.gql";

/**
 * Adds a new address book entry
 *
 * @returns {Array} The added address book entry
 */
export default function useUpdateSimpleInventory() {
  const [updateSimpleInventoryFunction, { loading }] = useMutation(updateSimpleInventoryMutation);

  const updateSimpleInventory = async (variantId, shopId, productId) => {
    const data = await updateSimpleInventoryFunction({
      variables: {
        input: {
          canBackorder: false,
          inventoryInStock: 1,
          isEnabled: true,
          lowInventoryWarningThreshold: 0,
          shopId,
          productConfiguration: {
            productId: productId,
            productVariantId: variantId,
          },
        },
      },
    });

    return data;
  };

  return [updateSimpleInventory, loading];
}
