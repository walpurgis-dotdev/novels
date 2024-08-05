import Link from "next/link";
import { Button } from "@/components/primitives/ui/button";
import { motion } from "framer-motion";
import { BadgeCheckIcon, CirclePlusIcon, X } from "lucide-react";

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
};

const Success = () => {
  return (
    <motion.section
      className="flex flex-col items-center justify-center w-full h-full gap-4 text-center md:gap-2"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <BadgeCheckIcon className="text-green-500 w-28 h-28 md:w-32 md:h-32" />
      <h4 className="text-2xl font-semibold md:text-3xl">Cảm ơn!</h4>
      <p className="max-w-md text-sm text-gray-500 md:text-base">
        Bạn đã hoàn thành quá trình tạo truyện. Hãy chờ chúng tôi kiểm tra và duyệt truyện của bạn.
      </p>
      <div className="flex items-center w-full mt-6">
        <div className="flex items-center justify-around w-full relative after:pointer-events-none after:absolute after:inset-px after:rounded-[11px] after:shadow-highlight after:shadow-white/10 focus-within:after:shadow-[#77f6aa] after:transition">
          <Button asChild variant="outline">
            <Link href="/novels">
              <X className="w-4 h-4 mr-2" /> Đóng
            </Link>
          </Button>
          <Button asChild>
            <Link href="/novels/edit">
              <CirclePlusIcon className="w-4 h-4 mr-2" /> Thêm bìa truyện
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default Success;
