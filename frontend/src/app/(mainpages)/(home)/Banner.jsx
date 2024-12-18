import Image from "next/image";
import bannerImg from "/public/assets/banner.png";
import { shimmer, toBase64 } from "@/utils/imageUtils";

const Banner = () => {
  return (
    <section className="flex flex-col items-center justify-between gap-12 py-16 md:flex-row-reverse">
      <div className="w-full items-center md:w-1/2 md:justify-end">
        <div className="relative overflow-hidden rounded-lg pt-[70%]">
          <Image
            src={bannerImg}
            alt="banner"
            width={500}
            height={500}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="absolute left-0 top-0 h-full w-full object-cover"
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <h1 className="mb-7 text-2xl font-medium md:text-5xl">New Releases This Week</h1>
        <p className="mb-10">
          It&apos;s time to update your reading list with some of the latest and greatest releases
          in the literary world. From heart-pumping thrillers to captivating memoirs, this
          week&apos;s new releases offer something for everyone
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>
    </section>
  );
};

export default Banner;
