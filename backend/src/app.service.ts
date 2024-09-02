import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from "firebase-admin"
import { AffiliateDto, CreateAffiliateDto, EstimateRevenueDto, EstimateRevenueResponse } from './dto';

@Injectable()
export class AppService {
  private firestore: admin.firestore.Firestore;
  private getLabel(month: number, year: number): string {
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    if (month === currentMonth && year === currentYear) {
      return `${monthNames[month]} (Current)`;
    } else if (year !== currentYear) {
      return `${monthNames[month]} ${year}`;
    } else {
      return monthNames[month];
    }
  }
  constructor() {
    this.firestore = admin.firestore();
  }

  async saveAffiliate(createAffiliateDto: CreateAffiliateDto) {
    try {
      const { id, ...data } = createAffiliateDto;
      if (id) {
        const affiliateRef = this.firestore.collection('affiliates').doc(id);
        await affiliateRef.update(data);
        return { id, ...data };
      } else {
        const affiliateRef = this.firestore.collection('affiliates').doc();
        await affiliateRef.set(data);
        return { id: affiliateRef.id, ...data };
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async getAffiliate() {
    try {
      const affiliates = await this.firestore.collection('affiliates').get();
      const data = affiliates.docs.map(doc => {
        const id = doc.id;
        const affiliateData = doc.data();
        return { id, ...affiliateData };
      });
      
      return data[0];
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async estimateRevenue(estimateRevenueDto: EstimateRevenueDto): Promise<{ label: string, revenue: number, referralPayout: number }[]> {
    try {
      const { monthlyRefferals, averageNewProjectPerMonth, existingProjectPerMonth } = estimateRevenueDto.affiliate;
      // Calculate the one-time fee for new projects
      const newProjectsFee = averageNewProjectPerMonth * estimateRevenueDto.pricePerProject;

      // Calculate the monthly fee for existing projects
      const existingProjectsFee = existingProjectPerMonth * estimateRevenueDto.monthlyFee;

      // Calculate the total payment from the customer
      const totalPayment = newProjectsFee + existingProjectsFee;

      // Calculate the affiliate payout (20% of the total payment)
      const affiliatePayout = totalPayment * estimateRevenueDto.affiliatePayout;

      // Calculate the total revenue and referral payout for the affiliate
      const totalRevenue = totalPayment * monthlyRefferals;
      const totalReferralPayout = affiliatePayout * monthlyRefferals;

      // Calculate future outcomes
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const futureOutcomes: EstimateRevenueResponse[] = [];
      for (let i = 0; i < 12; i++) {
        const month = (currentMonth + i) % 12;
        const year = currentYear + Math.floor((currentMonth + i) / 12);
        const label = this.getLabel(month, year);
        const revenue = totalRevenue * (i + 1);
        const referralPayout = totalReferralPayout * (i + 1);
        futureOutcomes.push({ label, revenue, referralPayout });
      }
      return futureOutcomes;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  getHello(): string {
    return 'Sunvoy Affiliate Tool';
  }
}


