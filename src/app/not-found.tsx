import Link from 'next/link';
export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">( 404 / A little off the map )</p><h1>This story<br />is elsewhere.</h1><Link className="pill" href="/">Back to projects ↗</Link></main>;
}
