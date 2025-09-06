import { useDispatch } from "react-redux";
import PaginationComponent from "../components/Pagination";
import { handleModel } from "../redux/layoutSlices/modelSlice";
import type { AppDispatch } from "../redux/store";
import { useEffect, useState } from "react";
import {
  deleteBookAsyncThunk,
  getBooksAsyncThunk,
} from "../redux/pagesSlices/bookSlice";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import LoaderComponent from "../components/LoaderComponent";
export default function Homepage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((s) => s?.books?.books);
  console.log("data", data);

  const handleAddBookModal = () => {
    dispatch(
      handleModel({
        state: true,
        model: "addBookModal",
        args: {},
      })
    );
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const loading = useSelector((s) => s?.books?.loadings?.getBooksAsyncThunk);
  const handleDeleteBook = (bookId: string) => {
    dispatch(
      deleteBookAsyncThunk({
        id: bookId,
        callBack: () => {
          dispatch(getBooksAsyncThunk({ page: 1 }));
        },
      })
    );
  };

  useEffect(() => {
    const params = { page };
    dispatch(getBooksAsyncThunk(params));
  }, [dispatch, page]);
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
          {loading ? (
            <LoaderComponent />
          ) : data?.results?.length === 0 ? (
            <div style={{ textAlign: "center", padding: "2rem 0", color: "#6366f1", fontWeight: 500 }}>
              No books found.
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.results?.map((item: any) => (
                    <tr key={item?._id || item?.id}>
                      <td>{item?.title}</td>
                      <td>{item?.author}</td>
                      <td>{item?.genre}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteBook(item?._id || item?.id)}
                          className="delete-button"
                        >
                          {loading ? <Spinner /> : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationComponent data={data} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
