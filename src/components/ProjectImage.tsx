import Image from 'next/image';
import type { Artwork } from '@/data/projects';

export default function ProjectImage({ image, priority = false, sizes = '(max-width: 700px) 90vw, 80vw', className = '' }: { image: Artwork; priority?: boolean; sizes?: string; className?: string }) {
  return <Image className={`project-image ${className}`} src={image.src} alt={image.alt} width={image.width} height={image.height} sizes={sizes} priority={priority} />;
}
