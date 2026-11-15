import { ProtectedRoute } from "@/components/protected-route";
import { StudioForm } from "@/components/studio-form";
export default function AddStudioPage() { return <ProtectedRoute><main className="form-page"><span className="eyebrow">Share your space</span><h1>List a studio.</h1><p className="muted">Give creators a place to do their best work.</p><StudioForm /></main></ProtectedRoute>; }
