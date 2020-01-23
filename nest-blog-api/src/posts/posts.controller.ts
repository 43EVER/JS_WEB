import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { Post as PostSchema } from './post.model'
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator'

import { Crud } from 'nestjs-mongoose-crud'

class CreatePostDto {
    @ApiProperty({ description: "帖子标题", example: "_测试帖子" })
    @IsNotEmpty({ message: "请填写帖子标题" })
    title: string
    @ApiProperty({ description: "帖子内容", example: "_测试帖子内容" })
    @IsNotEmpty({ message: "请填写帖子内容" })
    content: string
}

@Controller('posts')
@ApiTags("帖子")
@Crud({
    model: PostSchema,
    routes: {
        find: {
            decorators: [
                ApiOperation({ summary: "帖子列表" })
            ]
        },
        create: {
            dto: CreatePostDto
        }
    }
})
export class PostsController {
    constructor(
        @InjectModel(PostSchema) private readonly model: ModelType<PostSchema>
    ) {}
}
