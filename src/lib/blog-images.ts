const SUPABASE_BLOG_IMAGE_BASE =
  "https://kxlkulmuhnnnalnzlftn.supabase.co/storage/v1/object/public/MyCal_AppImages";

export function getBlogImage(fileName: string): string {
  return `${SUPABASE_BLOG_IMAGE_BASE}/${encodeURIComponent(fileName)}`;
}
