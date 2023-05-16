export class Logger {
  env: string;
  prefix: string;
  private static instance: Logger;
  private constructor(prefix:string = 'j5s') {
    this.prefix = prefix;
    this.env = process.env.NODE_ENV || 'development';
    console.log(this.env);
  }
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  info(...args: any[]) {  
    if (this.env === 'production') return;
    console.info(`[${this.prefix}]`, ...args);
  }

  log(...args: any[]) {  
    if (this.env === 'production') return;
    console.log(`[${this.prefix}]`, ...args);
  }

  warn(...args: any[]) {  
    if (this.env === 'production') return;
    console.warn(`[${this.prefix}]`, ...args);
  }
}