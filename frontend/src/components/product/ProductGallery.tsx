import { useMemo, useState } from "react";

import { cn } from "../../lib/cn";
import type { ProductImage } from "../../types/catalog";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

function getImageSource(image: ProductImage): string {
  return image.image_url || image.image;
}

function sortImages(images: ProductImage[]): ProductImage[] {
  return [...images].sort((current, next) => {
    if (current.is_primary && !next.is_primary) {
      return -1;
    }
    if (!current.is_primary && next.is_primary) {
      return 1;
    }
    return (current.sort_order ?? 0) - (next.sort_order ?? 0);
  });
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const orderedImages = useMemo(() => sortImages(images), [images]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(
    orderedImages[0]?.id ?? null,
  );
  const selectedImage =
    orderedImages.find((image) => image.id === selectedImageId) ?? orderedImages[0];

  if (!selectedImage) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-brand border border-amber-line bg-amber-cream">
        <div className="absolute inset-8 border border-amber-line bg-amber-ivory" />
        <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-gold/70" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-softGold/30" />
        <p className="absolute bottom-8 left-8 right-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-amber-muted">
          Imagen próximamente
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-brand border border-amber-line bg-amber-cream">
        <img
          className="aspect-[4/5] h-full w-full object-cover"
          src={getImageSource(selectedImage)}
          alt={selectedImage.alt_text || productName}
        />
      </div>

      {orderedImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {orderedImages.map((image, index) => {
            const isSelected = image.id === selectedImage.id;

            return (
              <button
                className={cn(
                  "overflow-hidden rounded-brand border bg-amber-cream transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-gold",
                  isSelected ? "border-amber-gold" : "border-amber-line hover:border-amber-gold",
                )}
                type="button"
                key={image.id}
                aria-label={`Ver imagen ${index + 1} de ${productName}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedImageId(image.id)}
              >
                <img
                  className="aspect-square h-full w-full object-cover"
                  src={getImageSource(image)}
                  alt={image.alt_text || `${productName} vista ${index + 1}`}
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
