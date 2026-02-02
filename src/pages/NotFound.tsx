const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-track-bg px-4">
      <div className="text-center space-y-4">
        <div className="text-6xl md:text-7xl">🙈</div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          페이지를 찾을 수 없어요
        </h1>
        <p className="text-muted-foreground">
          주소가 잘못되었거나, 페이지가 이동되었을 수 있어요.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center mt-6 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;

