interface PageHeaderProps {
  header: string;
  detail: string;
}

function PageHeader({ header, detail }: PageHeaderProps) {
  return (
    <div className="w-full p-5 pb-[10px] flex flex-col justify-center items-start">
      <h1 className="font-bold text-[1.2rem]">{header}</h1>
      <p className="text-slate-400 text-[.9rem]">{detail}</p>
    </div>
  );
}

export default PageHeader;