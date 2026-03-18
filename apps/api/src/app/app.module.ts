import { Module } from '@nestjs/common';
import { CmsModule } from './cms/cms.module';
import { PrismaModule } from './prisma/prisma.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [PrismaModule, CmsModule, PublicModule],
})
export class AppModule {}
