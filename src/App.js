import React, { useState, useEffect } from "react";
import Notes from "./Notes";
import PostDetails from "./PostDetails";

function App() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [post, setPost] = useState("");
  const [infoarr, setinfoArr] = useState([]);
  const [iseditpostOpen, seteditPost] = useState(false);
  const [editId, seteditId] = useState(null);
  const [postdetails, setpostdetails] = useState({});

  useEffect(() => {
    const totalNotes = JSON.parse(localStorage.getItem("notes") || null) || [];
    setinfoArr(totalNotes);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    if (title && category && post !== "") {
      let newNote = {
        title,
        category,
        post,
      };
      const newNotes = [...infoarr, newNote];
      setinfoArr(newNotes);
      localStorage.setItem("notes", JSON.stringify(newNotes));
    }
    setTitle("");
    setCategory("");
    setPost("");
    console.log({ infoarr });
  };

  const onSearchHandler = () => {
    const searchValue = document.getElementById("search").value;
    const totalNotes = JSON.parse(localStorage.getItem("notes") || null) || [];
    if (searchValue.length) {
      const filteredNotes = totalNotes.filter(
        (el) => el.category === searchValue
      );
      setinfoArr(filteredNotes);
    } else {
      setinfoArr(totalNotes);
    }
  };

  const clearHandler = () => {
    document.getElementById("search").value = "";
    const totalNotes = JSON.parse(localStorage.getItem("notes") || null) || [];
    setinfoArr(totalNotes);
  };

  const deleteHandler = (id) => {
    const totalNotes = JSON.parse(localStorage.getItem("notes") || null) || [];
    const removedList = totalNotes.filter((el, index) => {
      return index !== id;
    });
    setinfoArr(removedList);
    localStorage.setItem("notes", JSON.stringify(removedList));
  };

  const editHandler = (e, id) => {
    e.stopPropagation();
    seteditPost(true);
    const eNotes = infoarr[id];
    setTitle(eNotes.title);
    setCategory(eNotes.category);
    setPost(eNotes.post);
    seteditId(id);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (editId == null) return;
    const updatedArr = infoarr.map((el, index) => {
      if (index == editId) {
        el.post = post;
        el.title = title;
        el.category = category;
      }
      return el;
    });

    localStorage.setItem("notes", JSON.stringify(updatedArr));
    setinfoArr(updatedArr);
    seteditPost(false);
    setTitle("");
    setCategory("");
    setPost("");
  };

  const cancelEditPost = () => {
    seteditPost(false);
    setTitle("");
    setCategory("");
    setPost("");
  };

  const sendpostInfoHandler = (id) => {
    console.log(id);
    const sendNotes = infoarr[id];
    let sendTitle = sendNotes.title;
    let sendCategory = sendNotes.category;
    let sendPost = sendNotes.post;
    setpostdetails({ sendTitle, sendCategory, sendPost });
  };

  return (
    <div>
      <div class="flex">
        <div class="flex-initial">
          <div class="w-full max-w-xs">
            <form
              class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto"
              onSubmit={iseditpostOpen ? updateHandler : submitHandler}
            >
              <div class="mb-4">
                <h1 class="mb-4">Create a Post</h1>
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="title"
                >
                  Title
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="category"
                >
                  Category
                </label>
                <input
                  class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="category"
                  type="text"
                  value={category}
                  placeholder="Category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="category"
                >
                  Post
                </label>
                <input
                  class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="post"
                  type="text"
                  value={post}
                  placeholder="Post"
                  onChange={(e) => setPost(e.target.value)}
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                  type="submit"
                  id="postbtn"
                >
                  {iseditpostOpen ? "Update" : "Create Post"}
                </button>
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                  type="button"
                  id="cancelbtn"
                  onClick={cancelEditPost}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="flex-1">
          <div class="ml-6">
            <label
              class="block text-gray-700  font-bold mb-2 text-xl"
              for="search"
            >
              Search Post
            </label>
            <input
              class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline text-xl"
              id="search"
              type="text"
              placeholder="Search Post by category"
            />
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline"
              onClick={onSearchHandler}
            >
              Search
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-3 mb-3"
              onClick={clearHandler}
            >
              Clear
            </button>
            {infoarr.map((el, index) => {
              return (
                <div onClick={() => sendpostInfoHandler(index)}>
                  <Notes
                    title={el.title}
                    category={el.category}
                    post={el.post}
                    onClickHandler={deleteHandler}
                    index={index}
                    editClickHandler={editHandler}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div class="flex-1">
          {PostDetails && Object.keys(postdetails).length ? (
            <PostDetails postdetails={postdetails} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
