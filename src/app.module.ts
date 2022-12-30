import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/user.module';
import { BlogsModule } from './blogs/blogs.module';
import { PostsModule } from './post/posts.module';
import { DeleteAllModule } from './testing/delete-all.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    PostsModule,
    DeleteAllModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://admin:admin@backapi.wojaaxk.mongodb.net/?retryWrites=true&w=majority',
    // ),
    AuthModule,
    MongooseModule.forRoot(
      'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.1',
    ),
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
