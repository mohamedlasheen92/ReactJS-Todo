import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { loginSchema } from "../validation";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../config/axiosConfig";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { IErrorResponse } from "../interfaces";
import InputErrorMessage from "../components/InputErrorMessage";
import { loginFormData } from "../data";
import { useState } from "react";

interface ILoginInput {
  identifier: string
  password: string
}


const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginInput>({
    resolver: yupResolver(loginSchema)
  })
  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    setLoading(true);
    console.log("Data: ", data)
    try {
      const resData = await axiosInstance.post('/api/auth/local', data);
      console.log(resData);
      toast.success('Login successful! Redirecting you to the home page in 2 seconds.', {
        duration: 2000,
        style: {
          background: '#1e293b',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 500,
          border: '1px solid #22c55e',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff',
        },
      })
      localStorage.setItem("loggedInUser", JSON.stringify(resData.data));
      setTimeout(() => {
        location.replace('/');
      }, 1500)
    } catch (error) {
      const errObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errObj.response?.data.error.message}`, {
        duration: 2000,
        style: {
          background: '#1e293b',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 500,
          border: '1px solid #ef4444',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },

      })
    } finally {
      setLoading(false);
    }
  }

  // *** Renders
  const renderLoginForm = loginFormData.map(({ name, placeholder }, index) => {
    return (
      <div key={index}>
        <Input placeholder={placeholder} {...register(name)} />
        <InputErrorMessage message={errors[name]?.message} />
      </div>
    );
  });

  return (
    <div className="max-w-md lg:max-w-xl mx-auto">
      <h2 className="text-center mb-4 text-xl sm:text-3xl font-semibold">Login to get access!</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}
        <Button fullWidth loading={loading}>Login</Button>

      </form>
    </div>
  );
};

export default Login;
