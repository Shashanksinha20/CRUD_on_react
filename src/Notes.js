import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export const Notes = ({
  category,
  onClickHandler,
  editClickHandler,
  index,
}) => {
  return (
    <div>
      <div className="shadow appearance-none border rounded w-96 h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
        <p>Category : {category}</p>
        <div className="mb-8">
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(e) => onClickHandler(e,index)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            className="ml-6"
            onClick={(e) => editClickHandler(e,index)}
          />
        </div>
      </div>
    </div>
  );
};
export default Notes;
