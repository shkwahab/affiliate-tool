import { BadRequestException, Injectable } from '@nestjs/common';
import * as admin from "firebase-admin"
import { CreateAffiliateDto } from './dto';

@Injectable()
export class AppService {
  private firestore: admin.firestore.Firestore;
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
      const data=affiliates.docs.map(doc => doc.data());
      return data[0]
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  getHello(): string {
    return 'Sunvoy Affiliate Tool';
  }
}
