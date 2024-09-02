import { Body, Controller, Get, Param, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyAuthGuard } from './auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AffiliateDto, CreateAffiliateDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
 
  @ApiTags('Affiliate')
  @ApiOperation({ summary: 'Get Affiliate' })
  @ApiResponse({ status: 200, description: 'Get Affiliate Data', type: AffiliateDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiHeader({ name: "api-key", required: true })
  @UseGuards(ApiKeyAuthGuard)
  @Get('/affiliate')
  async getAffiliate() {
    return this.appService.getAffiliate();
  }

  @ApiTags('Affiliate')
  @ApiOperation({ summary: 'Create Affiliate' })
  @ApiResponse({ status: 200, description: 'Affiliate created successfully', type: AffiliateDto })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiHeader({ name: "api-key", required: true })
  @ApiBody({ type: CreateAffiliateDto })
  @UseGuards(ApiKeyAuthGuard)
  @Put('/affiliate')
  async createAffiliate(@Body(new ValidationPipe()) data: CreateAffiliateDto) {
    return this.appService.saveAffiliate(data);
  }

}
