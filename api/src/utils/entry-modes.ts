export const codeToEntryMode = (code: string): string => {
  return entryModes[code]
}

export const entryModes: { [key: string]: string } = {
  B: 'Bar Code',
  S: 'Swiped',
  K: 'Chip Card Read',
  P: 'Proximity',
  F: 'Fallback',
}
