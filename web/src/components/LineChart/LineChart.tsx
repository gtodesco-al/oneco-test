import { Point, DatumValue } from '@nivo/core'
import { ResponsiveLine, LineSvgProps } from '@nivo/line'

export type LineChartPoint = Point & {
  data: {
    date?: number
    x: DatumValue
    xFormatted: string | number
    y: DatumValue
    yFormatted: string | number
    yStacked?: number
    transactions?: number
  }
}

const LineChart = ({ ...rest }: LineSvgProps) => {
  return (
    <ResponsiveLine
      animate
      useMesh={true}
      layers={['axes', 'lines', 'slices', 'mesh', 'legends']}
      curve="linear"
      enableArea
      margin={{ top: 30, bottom: 25, right: 15, left: 75 }}
      {...rest}
    />
  )
}

export default LineChart
