import { LoggerModule } from 'nestjs-pino';

export const LoggerConfigModule = LoggerModule.forRoot({
  pinoHttp: {
    // quietReqLogger: true, // turn off the default logging output
    transport: {
      target: 'pino-pretty',
      options: {
        // singleLine: true,
        colorize: true,
      },
    },
  },
});
