import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ImageOffIcon } from "lucide-react";
import Image from "next/image";
import { ClassNameValue } from "tailwind-merge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { UploadGetFiles200Item } from "@/strapi-endpoints/__generated__/strapi-client/learningStrapiV5.schemas";

export const ImagesCarousel = ({
  images,
  singleImageOptions,
  CarouselContentClassName,
}: {
  images: (UploadGetFiles200Item | undefined)[];
  singleImageOptions?: { className: ClassNameValue };
  CarouselContentClassName?: ClassNameValue;
}) => {
  return (
    <Carousel>
      <CarouselContent className={cn(CarouselContentClassName)}>
        {images.length === 0 && <ImageEmptyItem isImagesArrayEmpty />}

        {images.length > 0 &&
          images.map((image, index) => {
            if (!image || !image.url || !image.alternativeText) {
              return (
                <ImageEmptyItem image={image} key={index + "-content-item"} />
              );
            }

            return (
              <CarouselItem key={`${image.documentId}-carousel-item`}>
                <Image
                  src={image.url}
                  alt={image.alternativeText}
                  width={512}
                  height={512}
                  className={cn(
                    "size-full rounded-md object-cover",
                    singleImageOptions?.className,
                  )}
                />
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </Carousel>
  );
};

const ImageEmptyItem = ({
  image,
  isImagesArrayEmpty = false,
}: {
  image?: UploadGetFiles200Item;
  isImagesArrayEmpty?: boolean;
}) => {
  return (
    <CarouselItem>
      <Empty className="size-full border">
        <EmptyHeader>
          <EmptyMedia variant={"icon"}>
            <ImageOffIcon />
          </EmptyMedia>
          <EmptyTitle>
            {isImagesArrayEmpty && "Images Array Is Empty"}
          </EmptyTitle>
          <EmptyDescription>
            {!image
              ? "No Image"
              : !image.url
                ? "No URL"
                : !image.alternativeText
                  ? "No Alternative Text"
                  : "Unknown"}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </CarouselItem>
  );
};
