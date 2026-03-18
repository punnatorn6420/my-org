import { Module } from '@nestjs/common';
import { CmsModule } from '../cms/cms.module';
import { PublicController } from './public.controller';

@Module({
  imports: [CmsModule],
  controllers: [PublicController],
})
export class PublicModule {}
