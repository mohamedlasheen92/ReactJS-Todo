import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/InputErrorMessage";

interface IFormInput {
  username: string
  email: string
  password: string
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log("Data: ", data)

  console.log("Errors: ", errors);
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Register to get access!</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Username" {...register("username", {
            required: "Username is a required field", minLength: {
              value: 5,
              message: "Username must be at least 5 characters"
            }
          })} />
          {errors?.username && <InputErrorMessage message={errors?.username?.message} />}
        </div>
        <div>
          <Input placeholder="Email Address" {...register("email", {
            required: "Email address is a required field",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address"
            }
          })} />
          {errors?.email && <InputErrorMessage message={errors?.email?.message} />}
        </div>
        <div>
          <Input placeholder="Password" {...register("password", {
            required: "Password is a required field",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} />
          {errors?.password && <InputErrorMessage message={errors?.password?.message} />}
        </div>

        <Button className="w-full cursor-pointer bg-blue-700 text-white py-2 rounded">Register</Button>
      </form>
    </div>
  );
};

export default Register;
