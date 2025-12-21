interface ResumeCardProps {
  title: string;
  value: number;
}

function ResumeCard({ title, value }: ResumeCardProps) {
  return (
    <div className="bg-white h-fit w-2xs my-4 rounded-sm border-primary-red border-2 p-4 flex flex-col gap-2">
      <p className="font-semibold">{title}</p>
      <p className={`text-xl ${value > 0 ? "text-green-500" : "text-red-500"}`}>
        R$ {value.toFixed(2)}
      </p>
    </div>
  );
}

export default ResumeCard;
