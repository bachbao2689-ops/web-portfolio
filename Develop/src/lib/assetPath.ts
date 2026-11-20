const BASE_PATH = process.env.NODE_ENV === 'production' ? '/web-portfolio' : '';

export function assetPath(src: string): string {
  if (!src || src.startsWith('http://') || src.startsWith('https://')) return src;
  if (BASE_PATH && src.startsWith(`${BASE_PATH}/`)) return src;
  return `${BASE_PATH}${src.startsWith('/') ? src : `/${src}`}`;
}
