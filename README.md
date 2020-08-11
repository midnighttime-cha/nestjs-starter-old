# Starter NestJS

## Setup
```bash
$ yarn add @nestjs/cli --global
$ nest --version
$ nest new project-name
$ cd project-name
$ yarn install
$ yarn start:dev
```

## Edit main.ts
```typescript
...
const app = await NestFactory.create(AppModule);
...
```
to
```typescript
...
const app = await NestFactory.create<NestExpressApplication>(AppModule);
...
```

## Setup main.ts
```javascript
$ import 'dotenv/config';
...
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
const bodyParser = require('body-parser');
...
#Handdle file.
import { MyLogger } from './shared/logger/logger.service';
import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
...
const port = process.env.HOST_PORT || 3003;
```

## Setup bootstrap in main.ts

### Chage
```javascript
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```
to

```javascript
...
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
    logger: new MyLogger()
  });
```