


import { useDispatch } from "react-redux";
import PaginationComponent from "../components/Pagination";
import {handleModel} from "../redux/layoutSlices/modelSlice";
import type { AppDispatch } from "../redux/store";

export default function Homepage() {
  const dispatch = useDispatch<AppDispatch>();
  const handleAddBookModal = () => {
    dispatch(
      handleModel({
        state: true,
        model: "addBookModal",
        args: {},
      })
    );
  };
  return (
    <div className="home-page-wrapper">
      <h1>Welcome to the Home Page</h1>
      <p>This is the home page of the application.</p>
      <div className="books-listing-wrapper">
        <div className="section-header">
          <h2>Books Listing</h2>
          <div className="btn-style">
            <button onClick={handleAddBookModal} className="btn-style light">
              Add Book
            </button>
          </div>
        </div>
        <div className="books-listing">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Added On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Book Title 1</td>
                <td>Author Name 1</td>
                <td>2023-10-01</td>
                <td>
                  <button onClick={handleAddBookModal} className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <PaginationComponent />
        </div>
      </div>
    </div>
  );
}
