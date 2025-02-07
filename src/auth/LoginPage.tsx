import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/hooks/zustand/store/useUserStore";
import { LoginInputType, userLoginSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [input, setInput] = useState<LoginInputType>({
    username: "",
    password: "",
  });
  const { login } = useUserStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<LoginInputType>>({});
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(input); //to check whether input is coming or not
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputType>);
      return;
    }
    try {
      await login(input);
      navigate("/dashboard/job-tracker");
    } catch (error: any) {
      console.log(error);
    }
  };
  const loading = false;
  return (
    <div className="flex items-center  justify-center min-h-screen ">
      <form
        onSubmit={submitHandler}
        className="md:p-8 w-full max-w-md md:border border-gray-200 rounde  mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-center text-2xl">Welcome Back</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              value={input.username}
              type="text"
              name="username"
              placeholder="John123"
              className="pl-10 focus-visible:ring-1"
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">{errors.username}</span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              onChange={changeEventHandler}
              value={input.password}
              type="password"
              name="password"
              placeholder="******"
              className="pl-10 focus-visible:ring-1"
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">{errors.password}</span>
            )}
          </div>
        </div>
        {loading ? (
          <Button
            disabled
            className="bg-green hover:bg-hoverGreen w-full border-none"
          >
            <Loader2 className="animate-spin h-4 w-4 mr-2" />
            Please Wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-green hover:bg-hoverGreen w-full border-none"
          >
            Login
          </Button>
        )}

        <Separator className="mt-7" />

        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create new Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
