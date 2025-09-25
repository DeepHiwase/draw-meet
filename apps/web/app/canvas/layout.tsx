interface CanvasLayoutProps {
  children: React.ReactNode;
}

function CanvasLayout({ children }: CanvasLayoutProps) {
  return <div className="h-screen w-screen">{children}</div>;
}

export default CanvasLayout;
