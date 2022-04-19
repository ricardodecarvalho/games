export const chooseCards = (
  array: { type: string; image: any }[],
  n: number
) => {
  const asd = array
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, n)
  return asd.concat(asd).sort(() => 0.5 - Math.random())
}
