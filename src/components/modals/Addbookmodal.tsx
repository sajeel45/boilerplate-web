import { useFormik } from "formik";
import { Modal, Spinner } from "react-bootstrap";
import * as Yup from "yup";

import type { ModalProps } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleModel } from "../../redux/layoutSlices/modelSlice";
import { addBookAsyncThunk, getBooksAsyncThunk } from "../../redux/pagesSlices/bookSlice";
import { useSelector } from "react-redux";

interface AddBookModalProps extends Partial<ModalProps> {
  show: boolean;
  onHide?: () => void;
}

export default function Addbookmodal({
  show,
  ...rest
}: AddBookModalProps) {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
  });
  const dispatch = useDispatch();
  const loading = useSelector((s) => s?.book?.loadings?.addBookAsyncThunk);
  const params = {}
  const handleSubmit = () => {
    dispatch(
      addBookAsyncThunk({
        data: { ...formik.values },
        callBack: () => {
          dispatch(
            handleModel({
              state: false,
              model: "addBookModal",
              args: {},
            })
          );
          dispatch(
            getBooksAsyncThunk(params)
          )
        },
      })
    );
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  const handleClose = () => {
    dispatch(
      handleModel({
        state: false,
        model: "addBookModal",
        args: {},
      })
    );
  };
  return (
    <Modal
      className="custom-modal add-book-modal"
      show={show}
      onHide={handleClose}
      centered
      {...rest}
    >
      <Modal.Header>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title && formik.touched.title ? <div className="error-message">{formik.errors.title}</div> : null}
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            {formik.errors.author && formik.touched.author ? <div className="error-message">{formik.errors.author}</div> : null}
          </div>
          <div>
            <label htmlFor="genre">Genre</label>
            <select id="" value={formik.values.genre} onChange={formik.handleChange} name="genre">
              <option value="">Select Genre</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="biography">Biography</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="self-help">Self-Help</option>
              <option value="history">History</option>
              <option value="children">Children's</option>
              <option value="young-adult">Young Adult</option>
            </select>
          </div>
          {
            formik.errors.genre && formik.touched.genre ? <div className="error-message">{formik.errors.genre}</div> : null
          }
          <div className="btn-style registration">
            <button type="submit"> { loading ? <Spinner size="sm" /> : "Add Book" }</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-style light" onClick={handleClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
