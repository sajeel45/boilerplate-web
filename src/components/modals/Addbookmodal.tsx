import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import * as Yup from "yup";

import type { ModalProps } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleModel } from "../../redux/layoutSlices/modelSlice";

interface AddBookModalProps extends Partial<ModalProps> {
  show: boolean;
  onHide?: () => void;
}

export default function Addbookmodal({
  show,
  onHide,
  ...rest
}: AddBookModalProps) {
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
  });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log("Form submitted");
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
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
    )
  }
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
            {formik.errors.title ? <div>{formik.errors.title}</div> : null}
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
            {formik.errors.author ? <div>{formik.errors.author}</div> : null}
          </div>
          <div className="btn-style registration">
            <button type="submit">Add Book</button>
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
