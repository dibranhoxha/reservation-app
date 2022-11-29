const CompanyCard = ({ name }: { name: string }) => {
  return (
    <div className="h-24 my-4 bg-gradient-to-r from-amber-100 to-fuchsia-50 flex justify-center items-center p-3 rounded-xl border-2 border-slate-100 shadow-lg transition-all transform-all hover:scale-105 cursor-pointer relative">
      <div className="text-slate-800 text-center">
        <div>{name}</div>
      </div>
    </div>
  );
};

export default CompanyCard;
