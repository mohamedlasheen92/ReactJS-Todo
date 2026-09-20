import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


const Login = () => {


  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-3xl font-semibold">Login to get access!</h2>

      <form className="space-y-4" >

        <Input placeholder="Email Address" />
        <Input placeholder="Password" />

        <Button>Login</Button>

      </form>
    </div>
  );
};

export default Login;
