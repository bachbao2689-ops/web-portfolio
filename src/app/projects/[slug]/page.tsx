import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectStory from '@/components/ProjectStory';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  return { title: project?.name || 'Project not found' };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex(p => p.slug === slug);
  if (index === -1) notFound();
  return <ProjectStory key={slug} project={projects[index]} nextProject={projects[(index + 1) % projects.length]} />;
}
