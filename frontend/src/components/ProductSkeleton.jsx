import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg p-3 shadow-sm">
      <div className="bg-gray-200 h-48 w-full rounded-md mb-3"></div>
      <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
    </div>
  );
};

export default ProductSkeleton;
