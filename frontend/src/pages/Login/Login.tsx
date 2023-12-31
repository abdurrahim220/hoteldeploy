import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import * as apiClient from "../../api/api-client";

export type SignInFormData = {
  email: string;
  password: string;
};
const Login = () => {
  const queryClient = useQueryClient();

  const { showToast } = useAppContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="border p-5 shadow-lg mx-2 md:my-0">
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <h2 className="text-3xl font-bold">Login In</h2>
        <label className="text-gray-700 text-sm font-bold  flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required" })}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold  flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
        </label>
        
        <span className="flex justify-between items-center">
          <div className="text-sm">
            Not Registered? <Link to="/register">Create an account here</Link>
          </div>
          <button
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
            type="submit"
          >
            login
          </button>
        </span>
      </form>
    </div>
  );
};

export default Login;
