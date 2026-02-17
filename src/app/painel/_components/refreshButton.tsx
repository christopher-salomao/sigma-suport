"use client";

import { useRouter } from "next/navigation";
import { FiRefreshCcw } from "react-icons/fi";

export function RefreshButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.refresh()}>
      <FiRefreshCcw className="w-6 h-6 hover:scale-110 transition-all duration-300" />
    </button>
  );
}
