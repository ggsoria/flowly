import React, { type ReactNode } from "react";

interface ScrollableContainerProps {
  children: ReactNode;
  scrollY?: boolean;
  scrollX?: boolean;
}
export const ScrollableContainer = (props: ScrollableContainerProps) => {
  return (
    <div
      className={`flex-1 h-full ${
        props.scrollY ? "overflow-y-auto" : "overflow-y-hidden"
      } ${
        props.scrollX ? "overflow-x-auto" : "overflow-x-hidden"
      } scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-track-card-light dark:scrollbar-track-card-dark scrollbar-thumb-secondary-light dark:scrollbar-thumb-secondary-dark scrollbar-w-1`}
    >
      {props.children}
    </div>
  );
};
