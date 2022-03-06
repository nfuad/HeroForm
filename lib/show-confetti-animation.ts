function generateRandomNumber(
  min: number,
  max: number,
  fractionDigits = 0
): number {
  const randomNumber = Math.random() * (max - min) + min;

  return Math.floor(randomNumber * 10 ** fractionDigits) / 10 ** fractionDigits;
}

function generateRandomArrayElement<T>(arr: T[]): T {
  return arr[generateRandomNumber(0, arr.length)];
}

const CONFETTI_ARGS = [
  { emojis: ["🎉"], confettiRadius: 100, confettiNumber: 30 },
  { emojis: ["🎉"] },
];

export const showConfettiAnimation = async () => {
  const JSConfetti = (await import("js-confetti")).default;

  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti(generateRandomArrayElement(CONFETTI_ARGS));
};
