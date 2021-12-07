import React from "react";

export const PostDetails = ({ postdetails }) => {
  return (
    <div>
      <div class="w-full max-w-xs ml-4">
        <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto">
          <div class="mb-4">
            <h1 class="mb-4">Title : {postdetails.sendTitle}</h1>
            <h1 class="mb-4">Category : {postdetails.sendCategory}</h1>
            <h1 class="mb-4">Post : {postdetails.sendPost}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetails;
