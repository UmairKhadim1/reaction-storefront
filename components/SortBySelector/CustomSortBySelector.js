import React from "react";
import PropTypes from "prop-types";
import Select from "components/Select";
import useTranslation from "hooks/useTranslation";

/**
 * Renders the select to allow users to sort products
 *
 * @param {String} sortBy - the key to sort by
 * @param {Function} onChange - the onChange event handler
 * @returns {React.Component} - the sort by selector
 */
function SortBySelector({ sortBy, onChange }) {
  const { t } = useTranslation("common"); // eslint-disable-line id-length

  return (
    <Select
      value={sortBy}
      options={[
        {
          name: t("minPriceAsc"),
          value: "asc"
        },
        {
          name: t("minPriceDesc"),
          value: "desc"
        }
      ]}
      inputProps={{
        name: "sortBy",
        id: "sort-by"
      }}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

SortBySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
};

export default SortBySelector;
