export const sleepSeconds = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds * 1000));

export const quickPause = () => sleepSeconds(2);