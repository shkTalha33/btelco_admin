import React, { useState } from "react";
import { Checkbox } from "antd";
import { Container } from "reactstrap";
import { RiCloseFill } from "react-icons/ri";
import ButtonComponent from "../common/ButtonComponent";

export default function CreateRole({ setRoles, roles, setIsModalOpen }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRoles = (role) => {
    const newRoles = [...roles];

    if (!newRoles.includes(role.key)) {
      newRoles.push(role.key);

      if (
        role.key.includes("staff") &&
        (role.key === "staff-edit" ||
          role.key === "staff-create" ||
          role.key === "staff-delete")
      ) {
        if (!newRoles.includes("staff-list")) newRoles.push("staff-list");
      }

      if (
        role.key.includes("package") &&
        (role.key === "package-edit" ||
          role.key === "package-create" ||
          role.key === "package-delete")
      ) {
        if (!newRoles.includes("package-list")) newRoles.push("package-list");
      }

      if (
        role.key.includes("faqs") &&
        (role.key === "faqs-edit" ||
          role.key === "faqs-create" ||
          role.key === "faqs-delete")
      ) {
        if (!newRoles.includes("faqs-list")) newRoles.push("faqs-list");
      }

      if (
        role.key.includes("firm") &&
        (role.key === "firm-edit" ||
          role.key === "firm-create" ||
          role.key === "firm-delete")
      ) {
        if (!newRoles.includes("firm-list")) newRoles.push("firm-list");
      }

      setRoles(newRoles);
    } else {
      const updatedRoles = newRoles.filter((r) => r !== role.key);

      if (role.key === "staff-list") {
        return setRoles(
          updatedRoles.filter(
            (r) =>
              r !== "staff-create" && r !== "staff-edit" && r !== "staff-delete"
          )
        );
      }

      if (role.key === "package-list") {
        return setRoles(
          updatedRoles.filter(
            (r) =>
              r !== "package-create" &&
              r !== "package-edit" &&
              r !== "package-delete"
          )
        );
      }

      if (role.key === "faqs-list") {
        return setRoles(
          updatedRoles.filter(
            (r) =>
              r !== "faqs-create" && r !== "faqs-edit" && r !== "faqs-delete"
          )
        );
      }

      if (role.key === "firm-list") {
        return setRoles(
          updatedRoles.filter(
            (r) =>
              r !== "firm-create" && r !== "firm-edit" && r !== "firm-delete"
          )
        );
      }

      setRoles(updatedRoles);
    }
  };

  const permissions = [
    { label: "Staff List", key: "staff-list", checked: true },
    { label: "Staff Create", key: "staff-create", checked: true },
    { label: "Staff Edit", key: "staff-edit", checked: true },
    { label: "Staff Delete", key: "staff-delete", checked: false },

    { label: "Package List", key: "package-list", checked: true },
    { label: "Package Create", key: "package-create", checked: true },
    { label: "Package Edit", key: "package-edit", checked: true },
    { label: "Package Delete", key: "package-delete", checked: false },

    { label: "FAQs List", key: "faqs-list", checked: true },
    { label: "FAQs Create", key: "faqs-create", checked: true },
    { label: "FAQs Edit", key: "faqs-edit", checked: true },
    { label: "FAQs Delete", key: "faqs-delete", checked: false },

    { label: "Firm List", key: "firm-list", checked: true },
    { label: "Firm Create", key: "firm-create", checked: true },
    { label: "Firm Edit", key: "firm-edit", checked: true },
    { label: "Firm Delete", key: "firm-delete", checked: false },

    { label: "Privacy", key: "privacy", checked: true },
    // { label: "Contact Us", key: "contactus", checked: true },
    // { label: "About Us", key: "aboutus", checked: true },
    { label: "Terms", key: "terms", checked: false },
    { label: "Subscription View", key: "subscription-view", checked: true },
    { label: "Transactions", key: "transactions", checked: true },
  ];

  return (
    <main className="poppins_regular add-firm text-sm lg:container mx-auto">
      <Container
        fluid
        className=" py-1 bg_white my-[0.5rem] border rounded-lg border-white w-full"
      >
        <div className="d-flex justify-between">
          <h4 className="mb-4 inter_medium" style={{ color: "#151D48" }}>
            Assign Roles
          </h4>

          <RiCloseFill
            onClick={() => setIsModalOpen(false)}
            size={25}
            title="Close"
            className="cursor-pointer"
            color="black"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {permissions.map((perm) => (
            <Checkbox
              key={perm.key}
              checked={roles.includes(perm.key)}
              className="my-3 flex items-center"
              onChange={() => handleRoles(perm)}
            >
              {perm.label}
            </Checkbox>
          ))}
        </div>
        <div className="text-end">
          <ButtonComponent
            loading={isLoading}
            btnText={"Done"}
            onClick={() => setIsModalOpen(false)} 
          />
        </div>
      </Container>
    </main>
  );
}
