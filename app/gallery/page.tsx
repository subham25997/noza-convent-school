import fs from "fs/promises";
import path from "path";
import HeroGallery from "@/components/gallery/HeroGallery";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import MomentsSection from "@/components/shared/MomentsSection";

async function getGallery2Images() {
  const galleryDir = path.join(process.cwd(), "public", "images", "gallery2");
  const entries = await fs.readdir(galleryDir, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => /^g(?:[1-9]|[1-4][0-9]|50)\.(jpe?g|png|webp|avif)$/i.test(name))
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

export default async function Gallery() {
  const gallery2Images = await getGallery2Images();
  const galleryImages = gallery2Images.map((src) => ({ src: `gallery2/${src}` }));

  return (
    <main>
      <HeroGallery />
      <PhotoGallery images={galleryImages} />
      <MomentsSection />
    </main>
  );
}
