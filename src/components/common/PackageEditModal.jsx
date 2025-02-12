import Modal from "react-bootstrap/Modal";
import CreatePackage from "../dashboard/Package/CreatePackage";
import { IoClose } from "react-icons/io5";
import { RiCloseFill } from "react-icons/ri";

function PackageEditModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="!p-0"
    >
      <div className=" p-4 pb-md-0">
        <div className="d-flex justify-between">
          <h4 className="mb-4 inter_medium" style={{ color: "#151D48" }}>
            Edit Plans
          </h4>

          <RiCloseFill
            onClick={props.onHide}
            size={25}
            title="Close"
            className="cursor-pointer"
            color="black"
          />
        </div>
      </div>
      <CreatePackage
        rowData={props.item}
        setIsModalOpen={props.setIsModalOpen}
      />
    </Modal>
  );
}

export default PackageEditModal;
