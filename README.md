# Starter NestJS

## Setup
```sh
$ yarn add @nestjs/cli --global
$ nest --version
$ nest new project-name
$ cd project-name
$ yarn install
$ yarn start:dev
```

## Platform
```sh
$ yarn add @nestjs/platform-express
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

## Setup Dependency
```sh
$ yarn add @nestjs/
```