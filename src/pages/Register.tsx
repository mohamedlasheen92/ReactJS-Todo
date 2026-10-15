import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";
import axiosInstance from "../config/axiosConfig";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup"
import { registerSchema } from "../validation";
import { registerFormData } from "../data";
import type { IErrorResponse } from "../interfaces";
import { useNavigate } from "react-router";
import { useState } from "react";


interface IRegisterInput {
  username: string
  email: string
  password: string
}

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  // *** Handlers
  const { register, handleSubmit, formState: { errors } } = useForm<IRegisterInput>({
    resolver: yupResolver(registerSchema)
  })
  const onSubmit: SubmitHandler<IRegisterInput> = async (data) => {
    setLoading(true);
    console.log("Data: ", data)
    try {
      const resData = await axiosInstance.post('/api/auth/local/register', data);
      console.log(resData);
      toast.success('Register successful! Redirecting you to the login page in 2 seconds.', {
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
      setTimeout(() => {
        navigate('/login');
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
  const renderRegisterForm = registerFormData.map(({ name, placeholder }, index) => {
    return <div key={index}>
      <Input  {...register(name)} placeholder={placeholder} />
      {errors[name] && <InputErrorMessage message={errors[name].message} />}
    </div>
  })

  console.log("Errors: ", errors);
  return (
    <div className="max-w-md lg:max-w-xl mx-auto">
      <h2 className="text-center mb-4 text-xl sm:text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}

        <Button fullWidth loading={loading}>Register</Button>
      </form>
    </div>
  );
};

export default Register;
