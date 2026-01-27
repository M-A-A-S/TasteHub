import React from "react";
import ExtrasGroupCard from "./ExtrasGroupCard";

const CardView = ({
  extrasGroups,
  handleEditExtrasGroup,
  handleDeleteExtrasGroup,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 transition-all duration-300">
      {extrasGroups?.map((extrasGroup) => (
        <ExtrasGroupCard
          key={extrasGroup.id}
          extrasGroup={extrasGroup}
          handleEditExtrasGroup={handleEditExtrasGroup}
          handleDeleteExtrasGroup={handleDeleteExtrasGroup}
        />
      ))}
    </div>
  );
};

export default CardView;
