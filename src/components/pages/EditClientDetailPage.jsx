import React, { useState } from 'react'
import TopSection from "../dashboard/TopSection";
import ClientInformationSection from '../common/informationDisplaySection'
import { avatar1 } from '../icons/icon';

export default function EditClientDetailPage() {

    const detailsInfo = [
        {
          title: "Basic Information",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
        {
          title: "Business Info",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
        {
          title: "Accounting and Tax Information",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
        {
          title: "Subscribed Services",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
        {
          title: "Financial Information",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
        {
          title: "Documents",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Pdf",
              value: "contracts.pdf",
            },
            {
              fieldName: "Pdf",
              value: "details.pdf",
            },
          ],
        },
        {
          title: "Communication",
          description: "This is information of Client.",
          subDetails: [
            {
              fieldName: "Image",
              value: avatar1,
            },
            {
              fieldName: "Name",
              value: "John Doe",
            },
            {
              fieldName: "Phone",
              value: "1234567890",
            },
            {
              fieldName: "Email",
              value: "abc@gmail.com",
            },
            {
              fieldName: "Address",
              value: "xyz, abc , efg",
            },
          ],
        },
      ];
      
      const [details, setDetails] = useState(detailsInfo);
    

  return (
    <>
            <main className="min-h-screen inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <TopSection
          userName="Good morning, Jake"
          description="Here is the client information."
        />
        <ClientInformationSection details={details} />
      </main>
    </>
  )
}
