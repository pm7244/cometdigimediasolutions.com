import React from "react";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import Filemanagermain from "../pagecomponent/fileManager/filemanagermain";

const StandardPageLayout = ({
  pageTitle,
  children,
  onSubmit,
  isSubmitting = false,
  fileManager = null
}) => {
  return (
    <div>
      {fileManager ? (
        fileManager
      ) : (
        <>
          <PageHeader currentpage={pageTitle} activepage="Pages" mainpage={pageTitle} />
          <div className="grid grid-cols-12 gap-x-6">
            {children}
          </div>
          
          {/* Submit Button */}
          <div className="grid grid-cols-12 mt-6">
            <div className="col-span-12">
              <div className="box">
                <div className="box-footer bg-transparent">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={onSubmit}
                      disabled={isSubmitting}
                      className="ti-btn ti-btn-primary"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StandardPageLayout;
