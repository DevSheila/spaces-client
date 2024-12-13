import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  return (
    <Link to={`/place/${placeId}`} className="m-4 flex flex-col md:m-2 xl:m-0">
      <div className="card ">
        {photos?.[0] && (
          <img
            src={`${photos?.[0]}`}
            className="h-4/5 w-full rounded-xl object-cover"
          />
        )}

        <h2 className="truncate font-bold">{title}</h2>
        <h3 className="truncate text-sm text-gray-500">{address}</h3>
        <div className="mt-1">
          <span className="font-semibold">KSH{price} </span>
          per day
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
