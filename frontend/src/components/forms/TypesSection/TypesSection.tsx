import { hotelTypes } from "../../../config/hotel-options-config";

import { useFormContext } from "react-hook-form";
import { HotelFromData } from "../ManageHotelForms/ManageHotelForms";

const TypesSection = () => {
  const { register, watch,formState:{errors} } = useFormContext<HotelFromData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-pointer bg-blue-300 text-sm rounded-full py-2 px-4 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full py-2 px-4 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
    </div>
  );
};

export default TypesSection;
