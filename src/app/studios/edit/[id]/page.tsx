"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getStudio } from "@/lib/api";
import type { Studio } from "@/lib/types";
import { ProtectedRoute } from "@/components/protected-route";
import { StudioForm } from "@/components/studio-form";
export default function EditStudioPage() {
  const { id } = useParams<{ id: string }>(); const [studio, setStudio] = useState<Studio>();
  useEffect(() => { getStudio(id).then(setStudio).catch((error) => toast.error(error.message)); }, [id]);
  return <ProtectedRoute><main className="form-page"><span className="eyebrow">Refine your space</span><h1>Edit listing.</h1>{studio ? <StudioForm studio={studio} /> : <div className="empty">Loading listing...</div>}</main></ProtectedRoute>;
}
