export default interface BannerDto {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  displayOrder: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}
