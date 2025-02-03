import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('currencies')
export class Currency {
  @PrimaryColumn()
  code: string; // e.g., "USD", "EUR"

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column('decimal', { precision: 10, scale: 2 })
  exchangeRate: number;
}
