import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from '../repository/posts.repository';
import { PostDBType, PostViewType } from '../schemas/post.schema';
import * as mongoose from 'mongoose';
import ObjectId = mongoose.Types.ObjectId;
import { CreatePostDto } from '../dto/create-post.dto';
import { PostQueryRepository } from '../repository/post.query-repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../../comments/application/comments.service';
import { PaginationInputDTO } from '../../helpers/dto/helpers.dto';
import { CommentsQueryRepository } from '../../comments/repository/comments.query-repository';

@Injectable()
export class PostsService {
  constructor(
    private postsRepository: PostsRepository,
    private postQueryRepository: PostQueryRepository,
    private commentsService: CommentsService,
    private commentsQueryRepository: CommentsQueryRepository,
  ) {}
  async createNewPost(createPostDto: CreatePostDto) {
    const findBlogById = await this.postQueryRepository.findBlogById(
      createPostDto.blogId,
    );

    if (!findBlogById)
      throw new NotFoundException([
        { message: 'blogId undefined', field: 'createNewPost' },
      ]);

    const newPost = new PostDBType(
      new ObjectId().toString(),
      createPostDto.title,
      createPostDto.shortDescription,
      createPostDto.content,
      findBlogById.id,
      findBlogById.id,
      findBlogById.name,
      new Date(),
      {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
        newestLikes: [],
      },
    );
    await this.postsRepository.createNewPost(newPost);
    return newPost;
  }
  async updatePostById(id: string, inputPostDTO: CreatePostDto) {
    const findPostById = await this.postQueryRepository.findPostById(id);
    if (!findPostById) throw new NotFoundException([]);
    return this.postsRepository.updatePostById(id, inputPostDTO);
  }
  async deletePostById(id: string) {
    const findPostById = await this.postQueryRepository.findPostById(id);
    if (!findPostById) throw new NotFoundException([]);
    return this.postsRepository.deletePostById(id);
  }
  async createNewCommentByPostId(
    id: string,
    createCommentDto: CreateCommentDto,
  ) {
    const findPostById = await this.postQueryRepository.findPostById(id);
    if (!findPostById) throw new NotFoundException([]);
    return this.commentsService.createNewComment(id, createCommentDto);
  }
  async findAllCommentsForPost(
    id: string,
    paginationInputDTO: PaginationInputDTO,
  ) {
    const findPostById = await this.postQueryRepository.findPostById(id);
    if (!findPostById) throw new NotFoundException([]);
    return this.commentsQueryRepository.findAllComments(id, paginationInputDTO);
  }
}
