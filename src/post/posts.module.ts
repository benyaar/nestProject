import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Post, PostSchema } from './schemas/post.schema';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './application/posts.service';
import { PostsRepository } from './repository/posts.repository';
import { Blog, BlogSchema } from '../blogs/schemas/blogs.schema';
import { PostQueryRepository } from './repository/post.query-repository';
import { CommentsModule } from '../comments/comments.module';
import { LikeStatus, LikeStatusSchema } from './schemas/like-status.schema';

@Module({
  imports: [
    CommentsModule,
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Blog.name, schema: BlogSchema },
      { name: LikeStatus.name, schema: LikeStatusSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, PostQueryRepository],
  exports: [PostsService, PostsRepository, PostQueryRepository],
})
export class PostsModule {}
