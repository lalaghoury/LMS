import { Icons } from "@/components/ui/icons";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Icons.spinner className="w-14 h-14 animate-spin" />
    </div>
  );
}
