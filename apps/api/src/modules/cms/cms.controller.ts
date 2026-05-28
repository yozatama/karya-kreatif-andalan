import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CmsService } from './cms.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { CreateBannerDto } from './dto/create-banner.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('CMS')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  // Blog endpoints
  @Public()
  @Get('blogs')
  @ApiOperation({ summary: 'List published blogs (public)' })
  async findAllBlogs(@Query() pagination: PaginationDto) {
    return this.cmsService.findAllBlogs(pagination, true);
  }

  @Public()
  @Get('blogs/:slug')
  @ApiOperation({ summary: 'Get blog by slug (public)' })
  async findBlogBySlug(@Param('slug') slug: string) {
    return this.cmsService.findBlogBySlug(slug);
  }

  @Post('blogs')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create blog post (admin)' })
  async createBlog(
    @Body() dto: CreateBlogDto,
    @CurrentUser('id') authorId: string,
  ) {
    return this.cmsService.createBlog(authorId, dto);
  }

  @Patch('blogs/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update blog post (admin)' })
  async updateBlog(@Param('id') id: string, @Body() dto: Partial<CreateBlogDto>) {
    return this.cmsService.updateBlog(id, dto);
  }

  @Delete('blogs/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete blog post (admin)' })
  async deleteBlog(@Param('id') id: string) {
    return this.cmsService.deleteBlog(id);
  }

  // FAQ endpoints
  @Public()
  @Get('faqs')
  @ApiOperation({ summary: 'List FAQs (public)' })
  async findAllFaqs() {
    return this.cmsService.findAllFaqs();
  }

  @Post('faqs')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create FAQ (admin)' })
  async createFaq(@Body() dto: CreateFaqDto) {
    return this.cmsService.createFaq(dto);
  }

  @Patch('faqs/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update FAQ (admin)' })
  async updateFaq(@Param('id') id: string, @Body() dto: Partial<CreateFaqDto>) {
    return this.cmsService.updateFaq(id, dto);
  }

  @Delete('faqs/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete FAQ (admin)' })
  async deleteFaq(@Param('id') id: string) {
    return this.cmsService.deleteFaq(id);
  }

  // Banner endpoints
  @Public()
  @Get('banners')
  @ApiOperation({ summary: 'List active banners (public)' })
  async findAllBanners() {
    return this.cmsService.findAllBanners();
  }

  @Post('banners')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create banner (admin)' })
  async createBanner(@Body() dto: CreateBannerDto) {
    return this.cmsService.createBanner(dto);
  }

  @Patch('banners/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update banner (admin)' })
  async updateBanner(@Param('id') id: string, @Body() dto: Partial<CreateBannerDto>) {
    return this.cmsService.updateBanner(id, dto);
  }

  @Delete('banners/:id')
  @Roles('super_admin', 'operational_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete banner (admin)' })
  async deleteBanner(@Param('id') id: string) {
    return this.cmsService.deleteBanner(id);
  }
}
