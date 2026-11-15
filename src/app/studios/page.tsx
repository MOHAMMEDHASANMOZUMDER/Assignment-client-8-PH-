import { Suspense } from "react";
import StudiosBrowser from "./studios-browser";
export default function StudiosPage() {
  return <Suspense fallback={<div className="empty" style={{ margin: 100 }}>Loading studios...</div>}><StudiosBrowser /></Suspense>;
}
