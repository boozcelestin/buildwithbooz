type SystemDemoProps = {
  height: number;
  src: string;
  title: string;
};

export function SystemDemo({ height, src, title }: SystemDemoProps) {
  return (
    <div className="svdemo">
      <iframe
        src={src}
        title={title}
        height={height}
        loading="lazy"
        sandbox="allow-scripts"
        scrolling="no"
      />
    </div>
  );
}
