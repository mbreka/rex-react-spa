export interface QueryI {
  skip?: number;
  limit?: number;
  delay?: number;
  select?: string;
  sortBy?: string;
  order?: string;
  categories?: string[];
  q?: string;
}

export interface ResponseBaseI {
  total?: number;
  skip?: number;
  limit?: number;
}

type Date = string;

/* * * * * * * * * * * * * * * * * * * * *
 *             PRODUCTS                  *
 * * * * * * * * * * * * * * * * * * * * */

export interface ProductsResponseI extends ResponseBaseI {
  products: ProductI[];
}

export interface ProductI {
  id: number;
  title: string;
  description: string;
  category: ProductCategoryI;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: DimensionsI;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: AvailabilityStatusI;
  reviews: ReviewI[];
  returnPolicy: ReturnPolicyI;
  minimumOrderQuantity: number;
  meta: MetaI;
  images: string[];
  thumbnail: string;
}

export enum AvailabilityStatusI {
  InStock = "In Stock",
  LowStock = "Low Stock",
}

export enum ProductCategoryI {
  Beauty = "beauty",
  Fragrances = "fragrances",
  Furniture = "furniture",
  Groceries = "groceries",
}

export interface DimensionsI {
  width: number;
  height: number;
  depth: number;
}

export interface MetaI {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export enum ReturnPolicyI {
  NoReturnPolicy = "No return policy",
  The30DaysReturnPolicy = "30 days return policy",
  The60DaysReturnPolicy = "60 days return policy",
  The7DaysReturnPolicy = "7 days return policy",
  The90DaysReturnPolicy = "90 days return policy",
}

export interface ReviewI {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

/* * * * * * * * * * * * * * * * * * * * *
 *                USERS                  *
 * * * * * * * * * * * * * * * * * * * * */

export interface UsersResponseI extends ResponseBaseI {
  users: UserI[];
}

export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: GenderI;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: HairI;
  ip: string;
  address: AddressI;
  macAddress: string;
  university: string;
  bank: BankI;
  company: CompanyI;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: CryptoI;
  role: RoleI;
}

export interface AddressI {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: CoordinatesI;
  country: CountryI;
}

export interface CoordinatesI {
  lat: number;
  lng: number;
}

export enum CountryI {
  UnitedStates = "United States",
}

export interface BankI {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface CompanyI {
  department: string;
  name: string;
  title: string;
  address: AddressI;
}

export interface CryptoI {
  coin: CoinI;
  wallet: WalletI;
  network: NetworkI;
}

export enum CoinI {
  Bitcoin = "Bitcoin",
}

export enum NetworkI {
  EthereumERC20 = "Ethereum (ERC20)",
}

export enum WalletI {
  The0Xb9Fc2Fe63B2A6C003F1C324C3Bfa53259162181A = "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
}

export enum GenderI {
  Female = "female",
  Male = "male",
}

export interface HairI {
  color: string;
  type: TypeI;
}

export enum TypeI {
  Curly = "Curly",
  Kinky = "Kinky",
  Straight = "Straight",
  Wavy = "Wavy",
}

export enum RoleI {
  Admin = "admin",
  Moderator = "moderator",
  User = "user",
}

/* * * * * * * * * * * * * * * * * * * * *
 *             CATEGORIES                *
 * * * * * * * * * * * * * * * * * * * * */

export type CategoriesResponseI = CategoryI[];

export interface CategoryI {
  slug: string;
  name: string;
  url: string;
}

/* * * * * * * * * * * * * * * * * * * * *
 *                   AUTH                *
 * * * * * * * * * * * * * * * * * * * * */

export interface LoginResponseI {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface MeResponseI extends UserI {}

export interface RefreshResponseI {
  accessToken: string;
  refreshToken: string;
}

/* * * * * * * * * * * * * * * * * * * * *
 *                   CART                *
 * * * * * * * * * * * * * * * * * * * * */

export interface CartMeta<T> {
  item: T;
  quantity: number;
}
