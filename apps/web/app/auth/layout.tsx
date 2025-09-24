const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-[url(/pattern.jpg)]">
      {children}
    </div>
  );
};

export default AuthLayout;
