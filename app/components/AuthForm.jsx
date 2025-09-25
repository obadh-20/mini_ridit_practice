import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, z } from "zod";


const AuthForm = ({ schema, onSubmit, SubmitLabel,error }) => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
   useEffect(() => {
     if (error) {
       setError("root", { message: error });
     }
   }, [error, setError]);
  return (
    <div className="h-screen flex flex-col justify-center items-center authcontainer">
      <img src="Group.png" />
      <img src="Group.png" />
      <img src="Group2.png" />
      <img src="Group2.png" />
      <img src="Group5.png" />
      <img src="Group3.png" />
      <img src="Group3.png" />
      <img src="Group4.png" />
      <div className="authformcontainer">
        <form
          className="flex gap-4 flex-col authform "
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="p-2 w-[250] rounded bg-transparent"
            {...register("email")}
            type="email"
            placeholder="email"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
          <input
            className="p-2 w-[250] rounded bg-transparent"
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
          <button type="submit">{SubmitLabel}</button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
