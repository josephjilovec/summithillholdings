import { redirect } from 'next/navigation';

/** Legacy route retained for existing bookmarks. */
export default function FounderRedirect() {
  redirect('/');
}
