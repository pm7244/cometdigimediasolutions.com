import React from "react";

const ImageManager = ({ 
  label, 
  images, 
  onSelectImage, 
  onRemoveImage, 
  maxFiles = 1,
  className = "" 
}) => {
  return (
    <div className={className}>
      <label className="ti-form-label">{label}</label>
      <div className="space-y-2">
        <button
          type="button"
          className="ti-btn ti-btn-outline-primary w-full"
          onClick={onSelectImage}
        >
          {images && images.length > 0 ? `Change ${label}` : `Select ${label}`}
        </button>
        {images && images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {images.slice(0, maxFiles).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`${import.meta.env.VITE_CMS_URL}api/transform/${image}`}
                  className="w-full h-24 rounded-sm object-cover border"
                  alt={`${label} ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => onRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageManager;
