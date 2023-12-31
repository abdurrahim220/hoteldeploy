import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../../config/hotel-options-config";
import { HotelFromData } from "../ManageHotelForms/ManageHotelForms";

const FacilitiesSection = () => {
  const { register,formState:{errors} } = useFormContext<HotelFromData>();
  return (
    <div>
      <h2>Facilities</h2>
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex items-center gap-1">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
    </div>
  );
};

export default FacilitiesSection;
