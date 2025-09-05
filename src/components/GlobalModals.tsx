import { useSelector } from "react-redux";
import Addbookmodal from "./modals/Addbookmodal";


const GlobalModals = () => {
  const { modelState, modelArgs } = useSelector((state) => state.model);
  console.log("🚀 ~ GlobalModals ~ modelState:", modelState);

  return (
    <>
      {modelState?.addBookModal && (
        <Addbookmodal
          show={modelState.addBookModal}
          {...modelArgs.addBookModal}
          modelKey="addBookModal"

        />
      )}

      {/* Add more modals here in the same way */}
    </>
  );
};
export default GlobalModals;
