"use client";

import HeroGallery from "@/components/gallery/HeroGallery";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import MomentsSection from "@/components/shared/MomentsSection";

export default function Gallery() {
  return (
    <main>
      <HeroGallery />
      <PhotoGallery />
      <MomentsSection />
    </main>
  );
}
