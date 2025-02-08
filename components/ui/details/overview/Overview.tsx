import OverviewItem from "./OverviewItem";

interface OverviewProps {
  date: string;
  duration: string;
  voteAverage: number;
  voteCount: number;
}

export default function Overview({
  date,
  duration,
  voteAverage,
  voteCount,
}: OverviewProps) {
  return (
    <div className="space-y-4 sm:text-lg">
      {date && <OverviewItem title="Lançamento">{date}</OverviewItem>}
      {duration && <OverviewItem title="Duração">{duration}</OverviewItem>}
      {voteAverage && (
        <OverviewItem title="Classificação">{voteAverage}</OverviewItem>
      )}
      {voteCount && <OverviewItem title="Votos">{voteCount}</OverviewItem>}
    </div>
  );
}
