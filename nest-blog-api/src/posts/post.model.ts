import { prop } from "@typegoose/typegoose"
import { ApiProperty } from "@nestjs/swagger"

export class Post {
    @ApiProperty({ description: "帖子标题", example: "_测试帖子" })
    @prop()
    title: string
    @ApiProperty({ description: "帖子详情", example: "_测试帖子内容" })
    @prop()
    content: string
}
