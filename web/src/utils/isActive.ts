/**
 * Various API objects have an "active" field that is a string value rather than a boolean.  This is a simple utility to check these for being active.
 * If the active field is ever corrected, this should be adjusted to just return the boolean value of the field.
 */
export const isActive = (
  item: { active?: boolean | null | undefined } | undefined
) => item?.active === true
