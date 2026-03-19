import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";

const TestimonialTable = () => {
  const [contacts, setContacts] = useState();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_CMS_URL}api/getalltestimonial`)
      .then((res) => res.json())
      .then((data) => setContacts(data.data))
      .catch((err) => {
        res.status(400).json({ message: "error occured", error: err.message });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteClick = (id) => {
    const confirm = window.confirm("Are you sure want to delete");
    if (confirm) {
      fetch(`${import.meta.env.VITE_CMS_URL}api/deletebyidtestimonial/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("Deleted Data successfully");
          fetchData();
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <div className="box">
      <div className="box-header">
        <h5 className="box-title">Testimonials Management</h5>
      </div>
      <div className="box-body">
        {contacts && contacts.length > 0 ? (
          <div className="table-responsive">
            <table
              id="delete-datatable"
              className="ti-custom-table ti-striped-table ti-custom-table-hover"
            >
              <thead>
                <tr>
                  <th scope="col" className="!text-start !text-[0.85rem] min-w-[200px]">S.No</th>
                  <th scope="col" className="!text-start !text-[0.85rem] min-w-[200px]">Name</th>
                  <th scope="col" className="!text-start !text-[0.85rem] min-w-[200px]">Message</th>
                  <th scope="col" className="!text-start !text-[0.85rem] min-w-[200px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts?.map((contact, index) => (
                  <Fragment key={contact.testimonial_id}>
                    <ReadOnlyRows
                      contact={contact}
                      index={index + 1}
                      handleDeleteClick={handleDeleteClick}
                      setContacts={setContacts}
                    />
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No testimonials found.
          </div>
        )}
      </div>
    </div>
  );
};
const ReadOnlyRows = ({ contact, index, handleDeleteClick, setContacts }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{contact.name}</td>
      <td className="max-w-md">
        <div className="text-[0.813rem] text-[#8c9097] dark:text-white/50">
          {contact.description && contact.description.length > 80 
            ? contact.description.slice(0, 80) + "..." 
            : contact.description}
        </div>
      </td>
      <td>
        <div className="flex flex-row items-center !gap-2 text-[0.9375rem]">
          <Link
            to={`/cms/pages/testimonals/edittestimonals/${contact.testimonial_id}`}
            className="ti-btn ti-btn-wave !gap-0 ti-btn-md ti-btn-soft-primary"
          >
            <i className="ri-edit-line"></i>
          </Link>
          <button
            aria-label="button"
            type="button"
            className="ti-btn ti-btn-wave !gap-0 ti-btn-md ti-btn-soft-danger"
            onClick={() => handleDeleteClick(contact.testimonial_id)}
          >
            <i className="ri-delete-bin-line"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TestimonialTable;
