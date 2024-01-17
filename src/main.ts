import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { SpelunkerModule } from 'nestjs-spelunker';
import * as fs from 'fs';
import { dump } from 'js-yaml';

import { createApp } from './app';

import 'share/models/associations';

async function bootstrap() {
  const app = await createApp();
  // nestjs-spelunkerの出力をmermaid形式に変換する。
  {
    const tree = SpelunkerModule.explore(app);
    const root = SpelunkerModule.graph(tree);
    const edges = SpelunkerModule.findGraphEdges(root);
    console.log('graph LR');
    const mermaidEdges = edges
      .map(({ from, to }) => `  ${from.module.name}-->${to.module.name}`)
      .filter((value) => !value.endsWith('-->SequelizeCoreModule'))
      .filter((value) => !value.endsWith('-->SequelizeModule')); // いらないはず
    console.log(mermaidEdges.join('\n'));
  }
  // swaggerの出力
  {
    const config = new DocumentBuilder()
      .setTitle('SC API')
      .setDescription('SC API')
      .setVersion('1.0')
      .addGlobalParameters({
        name: 'X-Requested-With',
        in: 'header',
        required: false,
        // 本来はtrueにすべきだが、クライアント自動生成時に入力を強制されて面倒なのでfalseにしている。
        // 現状はaxiosのデフォルト値を使っているため、リクエストごとに明示的に指定する必要が無い。
      })
      .addBearerAuth()
      .build();
    patchNestJsSwagger();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./dist/swagger-spec.yaml', dump(document));
    SwaggerModule.setup('api', app, document);
  }

  app.enableCors({
    origin: process.env.CORS_ORIGIN
      ? process.env.CORS_ORIGIN.split(',')
      : ['http://localhost:4000', 'http://localhost:4001'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
