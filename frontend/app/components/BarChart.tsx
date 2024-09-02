import { Bar, BarChart, CartesianGrid, LabelList, Tooltip, XAxis } from "recharts";

import { Card, CardContent } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "~/components/ui/chart";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "#afcc54",
  },
} satisfies ChartConfig;

const Chart = () => {
  const estimateRevenue = useSelector((state: RootState) => state.estimateRevenue);

  const chartData = estimateRevenue.map((data, index) => ({
    month: data.label,
    revenue: data.revenue,
    affiliatePayout: data.referralPayout,
    color: index === estimateRevenue.length - 1 ? "#afcc54" : "#afcc54",
  }));

  return (
    <Card>
      <CardContent>
        <ChartContainer className="border-none" config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <Tooltip
              content={<ChartTooltipContent />}
              cursor={false}
            />
            <Bar
              activeBar={{ fill: "#afcc54" }}
              dataKey="revenue"
              data={chartData}
              name={"Revenue"}
              fill={"gray"}
            >
              <LabelList
                position="top"
                offset={12}
                fontSize={12}
              />
            </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
