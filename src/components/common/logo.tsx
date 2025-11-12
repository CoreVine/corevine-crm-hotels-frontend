import { LOGO_PATH } from "@/lib/constants";

import Link from "next/link";
import Image from "next/image";

type Props = {
  href?: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function AppLogo({ href = "/", className, width = 50, height = 50 }: Props) {
  return (
    <Link href={href}>
      <Image src={LOGO_PATH} alt='Logo' className='h-8 w-auto' width={width} height={height} />
    </Link>
  );
}
