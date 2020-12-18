import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index, BeforeInsert, getManager, BeforeUpdate } from 'typeorm';
import { Districts } from 'src/common/geography/entities/district.entity';
import { Provinces } from 'src/common/geography/entities/province.entity';
import { SubDistricts } from 'src/common/geography/entities/sub-district.entity';
import { Geographies } from 'src/common/geography/entities/geography.entity';
import { Countries } from 'src/common/geography/entities/countries.entity';

@Entity({ name: 'address_baskets' })
export class AddressBaskets {
  @PrimaryGeneratedColumn({ name: 'id' }) id: number;
  @Column({ name: 'type', nullable: true }) type: number;
  @Index() @Column({ name: 'module' }) module: string;
  @Index() @Column({ name: 'module_id' }) moduleId: number;
  @Column({ name: 'address_th', nullable: true, type: 'text' }) addressTH: string;
  @Column({ name: 'address_en', nullable: true, type: 'text' }) addressEN: string;
  @Column({ name: 'address_cn', nullable: true, type: 'text' }) addressCN: string;

  @ManyToOne(type => SubDistricts, sub => sub.id, { cascade: true })
  @JoinColumn({ name: 'sub_district_id' }) subDistricts: SubDistricts
  @Column({ name: 'sub_district_id', nullable: true }) subDistictId: number;

  @ManyToOne(type => Districts, district => district.id, { cascade: true })
  @JoinColumn({ name: 'district_id' }) districts: Districts
  @Column({ name: 'district_id', nullable: true }) districtId: number;

  @ManyToOne(type => Provinces, province => province.id, { cascade: true })
  @JoinColumn({ name: 'province_id' }) provinces: Provinces
  @Column({ name: 'province_id', nullable: true }) provinceId: number;

  @Column({ name: 'zipcode', nullable: true }) zipcode: number;

  @ManyToOne(type => Geographies, geo => geo.id, { cascade: true })
  @JoinColumn({ name: 'geography_id' }) Geographies: Geographies
  @Column({ name: 'geography_id', nullable: true }) geographyId: number;

  @ManyToOne(type => Countries, country => country.id, { cascade: true })
  @JoinColumn({ name: 'country_id' }) countries: Countries
  @Column({ name: 'country_id', nullable: true }) countryId: number;

  @Column({ name: 'latitude', nullable: true }) latitude: string;
  @Column({ name: 'longitude', nullable: true }) longitude: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setCountry() {
    const provinces = await getManager().getRepository(Provinces).findOne({ id: this.provinceId });
    if (provinces) {
      const { countryId, geographyId } = provinces;
      this.geographyId = await geographyId;
      this.countryId = await countryId;
    }
  }
}
