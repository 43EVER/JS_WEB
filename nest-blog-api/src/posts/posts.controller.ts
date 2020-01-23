import { Controller, Get, Post, Body, Query, Put, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator'
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
    @ApiProperty({ description: "帖子标题", example: "_测试帖子" })
    @IsNotEmpty({ message: "请填写标题" })
    title: string
    @IsNotEmpty({ message: "请填写内容" })
    @ApiProperty({ description: "帖子详情", example: "_测试帖子内容" })
    content: string
}

@Controller('posts')
@ApiTags("帖子")
export class PostsController {
    constructor(
        @InjectModel(PostSchema) private readonly postModel: ModelType<PostSchema>
    ) {}

    @Get()
    @ApiOperation({ summary: "显示帖子列表" })
    async index() {
        return await this.postModel.find()
    }

    @Post()
    @ApiOperation({ summary: "创建帖子"})
    async create(@Body() createPostDto: CreatePostDto) {
        return {
            success: true,
            data: await this.postModel.create(createPostDto)
        }
    }

    @Get(":id")
    @ApiOperation({ summary: "帖子详情" })
    async detail(@Param("id") id: string) {
        return await this.postModel.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: "编辑帖子" })
    async update(@Param("id") id: string, @Body() updatePostDto: CreatePostDto) {
        return {
            success: true,
            data: await this.postModel.findByIdAndUpdate(id, updatePostDto)
        }
    }

    @Delete(":id")
    @ApiOperation({ summary: "删除帖子"})
    async remove(@Param("id") id: string) {
        return {
            success: true,
            data: await this.postModel.findByIdAndDelete(id)
        }
    }
}
