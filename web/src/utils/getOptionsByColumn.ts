type OptionsByColumnProps = {
  [key: string]: any[]
}

export default {
  status_code: [
    {
      label: 'Open',
      value: 1,
    },
    {
      label: 'Closed',
      value: 2,
    },
    {
      label: 'Error',
      value: 3,
    },
    {
      label: 'Processing',
      value: 4,
    },
  ],
} as OptionsByColumnProps
