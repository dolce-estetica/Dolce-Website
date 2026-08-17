"use client";

import { useRef } from "react";

/**
 * Horizontal scroller that also follows a mouse drag. Deliberately tiny and generic: the
 * cards it scrolls are passed in as already-rendered server markup, so none of them (or
 * their data) end up in the client bundle or get hydrated.
 */
export default function DragScroller({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    // Touch devices already scroll natively; only take over for mouse drags.
    if (e.pointerType === "touch" || !scroller.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: scroller.current.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !scroller.current) return;
    scroller.current.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div
      ref={scroller}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
