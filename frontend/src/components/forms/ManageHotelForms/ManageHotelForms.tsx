import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "../DetailsSection/DetailsSection";
import TypesSection from "../TypesSection/TypesSection";
import FacilitiesSection from "../FacilitiesSection/FacilitiesSection";
import GuestSection from "../GuestSection/GuestSection";
import ImageFiels from "../ImageFiels/ImageFiels";

export type HotelFromData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

type Props = {
  
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForms = ({ onSave, isLoading}: Props) => {
  const formMethods = useForm<HotelFromData>();

  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: HotelFromData) => {
    // create new formData object & call our api
    // console.log(formDataJson)
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

   

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    // console.log(formData)

    onSave(formData);
  });

  return (
    <div>
      <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypesSection />
          <FacilitiesSection />
          <GuestSection />
          <ImageFiels />
          <span className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-md bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving.." : "Save"}
            </button>
          </span>
        </form>
      </FormProvider>
    </div>
  );
};

export default ManageHotelForms;
