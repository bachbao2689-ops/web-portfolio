import Image from 'next/image';
import { Project } from '@/data/projects';
import StudyArtwork from './StudyArtwork';

export default function ProjectImage({ project, phase = 0, className = "" }: { project: Project; phase?: number; className?: string }) {
  // If the project has an image for the given phase, render it.
  // We use phase as an index into the images array. 
  // If we only have 1 image, we fallback to index 0. If no images, fallback to StudyArtwork.
  
  if (!project.images || project.images.length === 0) {
    return <StudyArtwork variant={project.variant} phase={phase} />;
  }

  const imageSrc = project.images[phase] || project.images[0];

  return (
    <div className={`w-full h-full relative overflow-hidden bg-[#13140f] rounded-2xl ${className}`}>
      <img
        src={imageSrc}
        alt={`${project.name} preview`}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
