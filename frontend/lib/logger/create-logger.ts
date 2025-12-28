type LogLevel = "info" | "warn" | "error" | "debug" | "success";

const createLogger = (namespace: string) => {
  const prefix = (level: LogLevel, colors: string[]) => {
    const time = new Date().toISOString().slice(11, 23);
    const styles = colors.map((c) => `color: ${c}; font-weight: bold`);
    return {
      args: [
        `%c[${time}]%c ${level.toUpperCase()} %c[${namespace}]`,
        "color: #888",
        styles[0],
        styles[1],
      ],
      plain: `[${time}] ${level.toUpperCase()} [${namespace}]`,
    };
  };

  const log = (
    level: LogLevel,
    colors: string[],
    method: "log" | "info" | "warn" | "error",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => {
    const p = prefix(level, colors);
    console[method](...p.args, ...args);
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    info: (...args: any[]) =>
      log("info", ["#3b82f6", "#06b6d4"], "info", ...args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn: (...args: any[]) =>
      log("warn", ["#f59e0b", "#eab308"], "warn", ...args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: (...args: any[]) =>
      log("error", ["#ef4444", "#dc2626"], "error", ...args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    success: (...args: any[]) =>
      log("success", ["#10b981", "#059669"], "log", ...args),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (...args: any[]) =>
      log("debug", ["#8b5cf6", "#a78bfa"], "log", ...args),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: (data: any, columns?: string[]) => {
      const p = prefix("info", ["#3b82f6", "#06b6d4"]);
      console.log(...p.args);
      console.table(data, columns);
    },

    group: (label: string) => {
      const p = prefix("info", ["#3b82f6", "#06b6d4"]);
      console.group(...p.args, label);
    },

    groupEnd: () => console.groupEnd(),

    time: (label: string) => console.time(`[${namespace}] ${label}`),
    timeEnd: (label: string) => console.timeEnd(`[${namespace}] ${label}`),
  };
};

export default createLogger;
