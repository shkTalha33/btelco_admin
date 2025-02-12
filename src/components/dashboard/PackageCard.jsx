import React, { useState } from 'react';
import { Divider } from "antd";
import toast from "react-hot-toast";
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { SlTrophy } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Card } from "reactstrap";
import ApiFunction from "../api/apiFuntions";
import { deletePackage } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import DeleteModel from "../common/deleteModal";
import PackageEditModal from "../common/PackageEditModal";
import { removePackage } from "../redux/pricingPackage";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

const AVAILABLE_FEATURES = [
  { id: 'lead', label: 'Manage leads and quotes' },
  { id: 'member', label: 'Create and manage members' },
  { id: 'chat', label: 'Chat with team members and clients' },
  { id: 'document', label: 'Upload and manage documents' },
  { id: 'email', label: 'Configure client emails' }
];

export default function PackageCard({ packageData }) {
  const [isUpdatePricingModalOpen, setIsUpdatePricingModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteSelectedPackage, setDeleteSelectedPackage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { deleteData } = ApiFunction();

  const handleUpdatePackages = (item) => {
    setSelectedItem(item);
    setIsUpdatePricingModalOpen(true);
  };

  const handleDeletePackages = async (item) => {
    setLoading(true);
    await deleteData(`${deletePackage}${packageData?._id}`)
      .then((response) => {
        dispatch(removePackage(item));
        toast.success(response?.message);
        setIsDeleteModalOpen(false);
      })
      .catch((err) => {
        return handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOpenDeleteModal = (item) => {
    setDeleteSelectedPackage(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <Card
        className="p-4 poppins_regulars package-card mt-3 shadow-md"
        key={packageData?._id}
      >
        <div className="flex justify-center gap-2 items-center">
          <div className="h-12 w-12 rounded-md flex items-center justify-center bg_primary text_white shrink-0">
            <SlTrophy size={28} />
          </div>
          <div className="heading-text inter_medium text-[1.40rem] text-center">
            {packageData.name}
          </div>
        </div>

        <h4 className="text-[#5E6675] text-center mt-3 text-[1.35rem] plusjakara_regular">
          ${packageData?.amount} per filling
        </h4>
        <p className="text-[#919191] text-center mt-1 mb-0">{packageData?.tags}</p>

        {AVAILABLE_FEATURES?.map((feature, index) => {
          const isFeatureIncluded = packageData?.features?.includes(feature.id);
          return (
            <div key={index}>
              <Divider className="my-[0.75rem]" />
              <div className="flex items-center">
                <span className={isFeatureIncluded ? "text-green-500" : "text-red-500"}>
                  {isFeatureIncluded ? <IoCheckmarkSharp size={20} /> : <IoCloseSharp size={20} />}
                </span>
                <span className="text-[#5E6675] text-sm ml-3">
                  {feature.label}
                </span>
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-center gap-2">
          <button
            className="px-3 py-2 text_white w-full flex justify-center bg_primary rounded-md mt-4"
            onClick={() => handleUpdatePackages(packageData)}
          >
            Edit
          </button>

          <button
            className="px-3 py-2 text_white w-full flex justify-center bg-red-600 rounded-md mt-4"
            onClick={() => handleOpenDeleteModal(packageData)}
          >
            Delete
          </button>
        </div>
      </Card>

      {selectedItem && (
        <PackageEditModal
          setIsModalOpen={setIsUpdatePricingModalOpen}
          show={isUpdatePricingModalOpen}
          onHide={() => {
            setIsUpdatePricingModalOpen(false);
            setSelectedItem(null);
          }}
          heading="Update Package"
          item={selectedItem}
        />
      )}
      <DeleteModel
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        setIsModalOpen={setIsDeleteModalOpen}
        sureText="Are You Sure To Delete This Package?"
        deleteItem={() => handleDeletePackages(deleteSelectedPackage)}
        loading={loading}
      />
    </>
  );
}