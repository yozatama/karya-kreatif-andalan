import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto, PaginatedResponseDto } from '../../common/dto/pagination.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateFaqDto } from './dto/create-faq.dto';
import { CreateBannerDto } from './dto/create-banner.dto';

@Injectable()
export class CmsService {
  constructor(private prisma: PrismaService) {}

  // Blogs
  async findAllBlogs(pagination: PaginationDto, publishedOnly: boolean) {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = pagination;
    const skip = (page - 1) * limit;
    const where = publishedOnly ? { isPublished: true } : {};

    const [blogs, total] = await Promise.all([
      this.prisma.blogPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { author: { select: { id: true, name: true } } },
      }),
      this.prisma.blogPost.count({ where }),
    ]);

    return new PaginatedResponseDto(blogs, total, page, limit);
  }

  async findBlogBySlug(slug: string) {
    const blog = await this.prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });
    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }
    return blog;
  }

  async createBlog(authorId: string, dto: CreateBlogDto) {
    return this.prisma.blogPost.create({
      data: {
        ...dto,
        authorId,
        isPublished: dto.isPublished || false,
        publishedAt: dto.isPublished ? new Date() : undefined,
      },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async updateBlog(id: string, dto: Partial<CreateBlogDto>) {
    const blog = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }
    const data: Record<string, unknown> = { ...dto };
    if (dto.isPublished && !blog.isPublished) {
      data.publishedAt = new Date();
    }
    return this.prisma.blogPost.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true } } },
    });
  }

  async deleteBlog(id: string) {
    const blog = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!blog) {
      throw new NotFoundException('Blog post not found');
    }
    await this.prisma.blogPost.delete({ where: { id } });
    return { message: 'Blog post deleted' };
  }

  // FAQs
  async findAllFaqs() {
    return this.prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
  }

  async createFaq(dto: CreateFaqDto) {
    return this.prisma.fAQ.create({ data: dto });
  }

  async updateFaq(id: string, dto: Partial<CreateFaqDto>) {
    const faq = await this.prisma.fAQ.findUnique({ where: { id } });
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    return this.prisma.fAQ.update({ where: { id }, data: dto });
  }

  async deleteFaq(id: string) {
    const faq = await this.prisma.fAQ.findUnique({ where: { id } });
    if (!faq) {
      throw new NotFoundException('FAQ not found');
    }
    await this.prisma.fAQ.update({ where: { id }, data: { isActive: false } });
    return { message: 'FAQ deleted' };
  }

  // Banners
  async findAllBanners() {
    const now = new Date();
    return this.prisma.banner.findMany({
      where: {
        isActive: true,
        OR: [
          { startDate: null, endDate: null },
          { startDate: { lte: now }, endDate: { gte: now } },
          { startDate: { lte: now }, endDate: null },
          { startDate: null, endDate: { gte: now } },
        ],
      },
      orderBy: { position: 'asc' },
    });
  }

  async createBanner(dto: CreateBannerDto) {
    return this.prisma.banner.create({
      data: {
        title: dto.title,
        imageUrl: dto.imageUrl,
        linkUrl: dto.linkUrl,
        position: dto.position || 0,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
      },
    });
  }

  async updateBanner(id: string, dto: Partial<CreateBannerDto>) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    const data: Record<string, unknown> = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.banner.update({ where: { id }, data });
  }

  async deleteBanner(id: string) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) {
      throw new NotFoundException('Banner not found');
    }
    await this.prisma.banner.update({ where: { id }, data: { isActive: false } });
    return { message: 'Banner deleted' };
  }
}
