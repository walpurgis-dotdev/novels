import { cls } from "@/utils/cn-classes";

function Spinner({ className, ...props }) {
  return (
    <div
      className={cls("w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
