"use client";

import * as React from "react";
import { cls } from "@/utils/cn-classes";

import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export function UserAuthForm({ className, type = "login", ...props }) {
  return (
    <div className={cls("grid gap-6", className)} {...props}>
      {type === "login" ? <LoginForm /> : <RegisterForm />}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">Hoặc đăng nhập với</span>
        </div>
      </div>
      {/* <UserWithOption isLoading={isLoading} /> */}
    </div>
  );
}
