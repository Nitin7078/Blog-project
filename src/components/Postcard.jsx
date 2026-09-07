
import React from "react";
import service from "../appwrite/config";
import { Link } from "react-router-dom";

function Postcard({ $id, title, img_id }) {
  const imageUrl = img_id ? service.getFileView(img_id) : null;

  return (
    <Link to={`/post/${$id}`} className="block group">
      <article className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Read Article */}
          <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            Read article →
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h2 className="line-clamp-2 text-xl font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
            {title}
          </h2>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Blog Article
            </span>

            <span className="text-sm font-medium text-blue-600">
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Postcard;

