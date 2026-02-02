import * as React from "react";

interface TooltipProviderProps {
  children: React.ReactNode;
}

// 실제 Tooltip 기능 없이, 컨텍스트 래퍼 역할만 하는 최소 구현
export function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}

