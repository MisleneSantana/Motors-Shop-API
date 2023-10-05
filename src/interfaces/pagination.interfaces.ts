import { Announcement } from '../entities';

export type TPagination = {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: Array<Announcement>;
};

export type TPaginationParams = {
  page: number;
  perPage: number;
  prevPage: string | null;
  nextPage: string | null;
  order: string;
  sort: string;
};
