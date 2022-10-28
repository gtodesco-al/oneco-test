import { AxisProps } from '@nivo/axes'
import { BarLegendProps, ComputedDatum, ResponsiveBar } from '@nivo/bar'
import { OrdinalColorScaleConfig } from '@nivo/colors'
import { Margin } from '@nivo/core'

type BarChartDataProps = {
  [key: string]: number | string
}

type TooltipProps = {
  id: string | number
  data: BarChartDataProps
  formattedValue: string
}

type BarChartProps = {
  axisBottom?: AxisProps
  axisLeft?: AxisProps
  hoverColor?: string
  colors?: OrdinalColorScaleConfig<ComputedDatum<BarChartDataProps>>
  data: Array<BarChartDataProps>
  indexBy: string
  keys: string[]
  legends?: BarLegendProps[]
  margin?: Partial<Margin>
  tooltip?(data: TooltipProps): JSX.Element
  valueFormat?(value: number | string): string
}

const BarChart = ({
  axisBottom,
  axisLeft,
  colors,
  data,
  hoverColor,
  indexBy,
  keys,
  legends,
  margin,
  tooltip,
  valueFormat,
}: BarChartProps) => {
  return (
    <ResponsiveBar
      animate
      colors={colors}
      axisBottom={axisBottom}
      axisLeft={axisLeft}
      data={data}
      enableGridX={false}
      enableGridY={false}
      enableLabel={false}
      indexBy={indexBy}
      keys={keys}
      margin={margin || { top: 20, bottom: 55, right: 15, left: 75 }}
      tooltip={tooltip}
      valueFormat={valueFormat}
      legends={legends}
      onMouseEnter={(_, event) => {
        const rect = event.target as SVGElement
        rect.style.fill = hoverColor || rect.style.fill
      }}
      onMouseLeave={(_, event) => {
        ;(event.target as SVGElement).style.fill = '' + colors
      }}
    />
  )
}

export default BarChart
