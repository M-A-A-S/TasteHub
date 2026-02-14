import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import StatCard from "./StatCard";

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  my-2">
      {stats?.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};
export default Stats;
