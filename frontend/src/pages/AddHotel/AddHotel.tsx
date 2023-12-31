import { useMutation } from "react-query";

import { useAppContext } from "../../context/AppContext";

import * as apiClient from '../../api/api-client'

import ManageHotelForms from "../../components/forms/ManageHotelForms/ManageHotelForms";
const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };
  return (
    <div className="mx-2 md:mx-0 p-5 border shadow-lg rounded-lg">
      <ManageHotelForms onSave={handleSave} isLoading={isLoading} />
    </div>
  );
};

export default AddHotel;
